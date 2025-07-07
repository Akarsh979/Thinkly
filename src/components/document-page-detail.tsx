"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "./ui/skeleton";
import DeleteDocumentButton from "./delete-document-button";
import { cn } from "@/lib/utils";

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

  // if (!document) {
  //   return <div>You don&apos;t have access to view this document</div>;
  // }

  return (
    <div className="space-y-6 pb-10">
      {!document && (
        <div className="space-y-8">
          <div>
            <Skeleton className="h-[40px] w-[500px] rounded-lg"/>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-[40px] w-[80px] rounded-md"/>
            <Skeleton className="h-[40px] w-[80px] rounded-md"/>
          </div>
          <Skeleton className="h-[500px] rounded-xl"/>
        </div>
      )}

      {document && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-400/10 flex items-center justify-center text-purple-400">
                <FileText className="h-5 w-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {document?.title}
              </h1>
            </div>
            <DeleteDocumentButton documentId={document._id}/>
          </div>

          <Tabs defaultValue="document" className="w-full">
            <TabsList className="mb-4 w-full sm:w-auto bg-muted/40">
              <TabsTrigger 
                value="document"
                className="data-[state=active]:bg-purple-400 data-[state=active]:text-white"
              >
                Document
              </TabsTrigger>
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:bg-purple-400 data-[state=active]:text-white"
              >
                Chat
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="document" className="mt-0">
              <div className={cn(
                "bg-card border rounded-xl flex-1 h-[600px] overflow-auto shadow-sm",
                "transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-400/30"
              )}>
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                    <p className="text-gray-500 dark:text-gray-400">Loading document...</p>
                  </div>
                ) : error ? (
                  <div className="h-full flex flex-col items-center justify-center text-destructive p-6 text-center">
                    <div className="rounded-full bg-destructive/10 p-3 mb-4">
                      <FileText className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="font-medium">Error loading document</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{error}</p>
                  </div>
                ) : text ? (
                  <div 
                    className="prose max-w-none p-6"
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      fontFamily: 'monospace',
                      lineHeight: '1.5',
                    }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">No document content available</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This document appears to be empty</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="mt-0">
              <ChatPanel documentId={document._id}/>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default DocumentPageDetail;
