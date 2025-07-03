"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function DocumentPageDetail({ slug }: { slug: Id<"documents"> }) {
  const document = useQuery(api.documents.getDocument, {
    slug: slug,
  });

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    
    const fetchText = async () => {
      if (!document?.documentUrl) {
        setLoading(false);
        setError("No document URL provided");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(document.documentUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.text();
        if (isMounted) {
          setText(data);
          setError("");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchText();

    return () => {
      isMounted = false;
    };
  }, [document]);

  if (!document) {
    return <div>You don&apos;t have access to view this document</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document?.title}</h1>
      </div>

      <div className="flex gap-12">

      <Tabs defaultValue="document" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="document">
                  <div className="bg-gray-900 p-4 rounded-xl flex-1 h-[500px] overflow-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <span className="sr-only">Loading document...</span>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-red-400">
              <p>Error loading document: {error}</p>
            </div>
          ) : text ? (
            <div 
              className="prose prose-invert max-w-none p-4"
              style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: 'monospace',
                lineHeight: '1.5',
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No document content available
            </div>
          )}
        </div>
        </TabsContent>
        <TabsContent value="chat">
          <ChatPanel documentId={document._id}/>
        </TabsContent>
      </Tabs>   




      </div>
    </>
  );
}

export default DocumentPageDetail;
