'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/ui/theme-toggle";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function Home() {

  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments)

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton/>
       
       <ThemeToggle/>

      <Button onClick={()=>{createDocument({title: "Hello World"})}}>Click me</Button>

      {documents?.map((doc)=>(
        <div key={doc._id}>{doc.title}</div>
      ))}

      </Authenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
      </main>
  );
}
