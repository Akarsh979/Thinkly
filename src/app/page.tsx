'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
       
      <button onClick={()=>{createDocument({title: "Hello World"})}}>Click me</button>

      {documents?.map((doc)=>(
        <div key={doc._id}>{doc.title}</div>
      ))}

      </Authenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
      </main>
    </div>
  );
}
