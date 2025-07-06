import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation, mutation, query } from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";
import { hasOrgAccess } from "./documents";
import { Id } from "./_generated/dataModel";

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

export const getNote = query({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const note = await ctx.db.get(args.noteId);

    if (!note) {
      return null;
    }

    if (note.orgId){
      const hasAccess = await hasOrgAccess(ctx, note.orgId);

      if (!hasAccess) {
        return null;
      }

    }else{
      if (note.tokenIdentifier !== userId) {
        return null;
      }
    }



    return note;
  },
});

export const getNotes = query({
  args:{
    orgId: v.optional(v.string()),
  },
  async handler(ctx,args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    if(args.orgId){
      const hasAccess = await hasOrgAccess(ctx, args.orgId);

      console.log("Kya Access Hai -> ", hasAccess)

      if (!hasAccess) {
    console.log("Lalaaa"); 
        return null;
      }

      const notes = await ctx.db
      .query("notes")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();  

     return notes
    }else{
      const notes = await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .order("desc")
      .collect();

    return notes;
    }

  },
});

export async function embed(text: string): Promise<number[]> {
   const embedding = await openai .embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
   })

   return embedding.data[0].embedding
}

export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    })
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  handler: async (ctx, args) => {

    const embedding = await embed(args.text);
    
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding: embedding,
    });
  },
});

export const createNote = mutation({
  args: {
    text: v.string(),
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { text } = args;
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You must be logged in to create a note.");
    }
    
    let noteId: Id<"notes">;

    if (args.orgId){
      const isMember = await hasOrgAccess(ctx, args.orgId);
      
      if (!isMember) {
        throw new ConvexError("You don't have permission to create a note in this organization.");
      }

      noteId = await ctx.db.insert("notes", {
        text,
        orgId: args.orgId,
      });

    }else{
    noteId = await ctx.db.insert("notes", {
      text,
      tokenIdentifier: userId,
    });    
    }



    await ctx.scheduler.runAfter(0,internal.notes.createNoteEmbedding, {
      noteId: noteId,
      text: args.text,
    })

    return noteId;
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You must be logged in to delete a note.");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note) {
      throw new ConvexError("Note not found");
    }

    if (note.orgId) {
      const hasAccess = await hasOrgAccess(ctx, note.orgId);

      if (!hasAccess) {
        throw new ConvexError("You do not have permission to delete this note");
      }
    } else{
      if (note.tokenIdentifier !== userId) {
        throw new ConvexError("You don't have permission to delete this note");
      }
    }

    await ctx.db.delete(args.noteId);
    return { success: true };
  },
});
