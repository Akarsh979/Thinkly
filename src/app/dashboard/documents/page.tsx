'use client'

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DocumentCard from "@/components/document-card";
import UploadDocumentButton from "@/components/upload-document-button";
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { FileText } from "lucide-react";

export default function Home() {
  const organization = useOrganization();

  const documents = useQuery(api.documents.getDocuments,{
    orgId: organization.organization?.id,
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-400/10 flex items-center justify-center text-purple-400">
            <FileText className="h-5 w-5" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            My Documents
          </h1>
        </div>
        <UploadDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">       
          {new Array(8).fill("").map((ele, index) => (
            <Card 
              className="h-[200px] p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md hover:border-purple-200" 
              key={index}
            >
              <Skeleton className="h-[20px] w-3/4 rounded"/>
              <Skeleton className="h-[20px] w-full rounded"/>
              <Skeleton className="h-[20px] w-5/6 rounded"/>
              <Skeleton className="w-[80px] h-[40px] rounded"/>
            </Card>
          ))}
        </div>  
      )} 
     
      {documents && documents.length === 0 && (
        <div className="py-16 flex flex-col justify-center items-center gap-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-8 my-6 transition-all">
          <div className="relative h-40 w-40 drop-shadow-md">
            <Image
              src="/document.svg"
              fill
              alt="Document illustration"
              className="object-contain"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">You have no documents yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              Upload your first document to get started with your second brain
            </p>
          </div>
          <UploadDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documents?.map((doc) => (
            <DocumentCard key={doc._id} document={doc}/>
          ))}
        </div>
      )}
    </div>
  );
}
