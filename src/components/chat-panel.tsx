'use client'

import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import QuestionForm from "./question-form";
import { useEffect, useRef } from "react";

function ChatPanel({documentId}:{documentId:Id<"documents">}){
   const chats = useQuery(api.chats.getChatsforDcoument, {documentId: documentId})
   const messagesEndRef = useRef<HTMLDivElement | null>(null)

   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   }   

   useEffect(() => {
     scrollToBottom()
   }, [chats]);   

   return (
    <div className="bg-background flex flex-col gap-2 p-4 h-[600px] rounded-lg border shadow-sm">
      <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent pr-4">
         <div className="flex flex-col gap-4">
              <div className="bg-muted/50 rounded-lg p-4 max-w-[80%] animate-in slide-in-from-left">
                <p className="text-sm text-muted-foreground mb-1">AI Assistant</p>
                <p>Ask any question about this document below:</p>
              </div>            
            {!chats || chats.length === 0 ? (
              <></>
            ) : (
              chats.map((chat) => (
                <div key={chat._id} className={cn("flex flex-col gap-2", {
                  "items-end": chat.isHuman,
                })}>
                  <div className={cn("rounded-lg p-4 max-w-[80%]", {
                    "bg-primary text-primary-foreground animate-in slide-in-from-right": chat.isHuman,
                    "bg-muted/50 animate-in slide-in-from-left": !chat.isHuman
                  })}>
                    <p className={cn("text-sm mb-1", {
                      "opacity-80": chat.isHuman,
                      "text-muted-foreground": !chat.isHuman
                    })}>
                      {chat.isHuman ? "You" : "AI Assistant"}
                    </p>
                    <p className="whitespace-pre-line">{chat.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
         </div>
      </div>

     <QuestionForm documentId={documentId}/>
    </div>
   );
}

export default ChatPanel;