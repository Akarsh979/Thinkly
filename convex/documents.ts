import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";

import OpenAI from "openai";
import { Id } from "./_generated/dataModel";
import { access } from "fs";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function hasAccessToDocument(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  if (!userId) {
    return null;
  }

  const document = await ctx.db.get(documentId);

  if (!document) {
    return null;
  }

  if (document?.tokenIdentifier !== userId) return null;

  return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.documentId);
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not Authenticated");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      fileId: args.fileId,
      tokenIdentifier: userId,
      description: "",
    });

    await ctx.scheduler.runAfter(
      0,
      internal.documents.generateDocumentDescription,
      {
        fileId: args.fileId,
        documentId,
      }
    );
  },
});

export const generateDocumentDescription = internalAction({
  args: {
    fileId: v.id("_storage"),
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const file = await ctx.storage.get(args.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `Here is a text file: ${text}` },
          {
            role: "user",
            content: `Please generate 1 sentence description for this document`,
          },
        ],
      });

    const response =
      chatCompletion.choices[0].message.content ??
      "Could not figure out a description for this document";

    await ctx.runMutation(internal.documents.updateDocumentDescription, {
      documentId: args.documentId,
      description: response,
    });
  },
});

export const updateDocumentDescription = internalMutation({
  args: {
    documentId: v.id("documents"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, {
      description: args.description,
    });
  },
});

export const getDocuments = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return undefined;
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDocument = query({
  args: {
    slug: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const accessObj = await hasAccessToDocument(ctx, args.slug);

    if (!accessObj) return null;

    return {
      ...accessObj.document,
      documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
    };
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await ctx.runQuery(
      internal.documents.hasAccessToDocumentQuery,
      {
        documentId: args.documentId,
      }
    );

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    const file = await ctx.storage.get(accessObj.document.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    //store user prompt as a chat record
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: accessObj.userId,
    });

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `Here is a text file: ${text}` },
          {
            role: "user",
            content: `Please answer this question: ${args.question}`,
          },
        ],
      });

    //store AI response as a chat record
    const response =
      chatCompletion.choices[0].message.content ??
      "Could not generate a response";

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: accessObj.userId,
    });

    return response;
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    await ctx.storage.delete(accessObj.document.fileId);
    await ctx.db.delete(args.documentId);
  },
})

