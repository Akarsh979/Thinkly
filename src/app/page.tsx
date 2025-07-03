'use client'

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DocumentCard from "@/components/document-card";
import UploadDocumentButton from "@/components/upload-document-button";
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments)

  return (
      <main className="p-24 space-y-8">
      
      <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">My Documents</h1>  
      <UploadDocumentButton/>
      </div>

    {!documents && (
      <div className="grid grid-cols-4 gap-4">       
        {new Array(8).fill("").map((ele,index)=>(
          <Card className="h-[200px] p-6 flex flex-col justify-between" key={index}>
            <Skeleton className="h-[20px] rounded"/>
            <Skeleton className="h-[20px] rounded"/>
            <Skeleton className="h-[20px] rounded"/>
            <Skeleton className="w-[80px] h-[40px] rounded"/>
          </Card>
        ))}
      </div>  
      )} 
     
     {documents && documents.length === 0 && (
       <div className="py-16 flex flex-col justify-center items-center gap-8 rounded-lg border border-dashed border-gray-300  dark:border-gray-700  px-8 my-6">
         <Image
           src="/document.svg"
           width="220"
           height="220"
           alt="a picture of a girl holding documents"
           className="drop-shadow-md"
         />
         <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">You have no documents yet</h2>
         <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
           Upload your first document to get started with your second brain
         </p>
         <UploadDocumentButton/>
       </div>
     )}
 

    {documents && documents.length > 0 && (
      <div className="grid grid-cols-4 gap-4">
      {documents?.map((doc)=>(
        <DocumentCard key={doc._id} document={doc}/>
      ))}
      </div>
    )}

      </main>
  );
}
