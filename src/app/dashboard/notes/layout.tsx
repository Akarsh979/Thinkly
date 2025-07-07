'use client';

import CreateNoteButton from "@/components/create-note-button";
import { Id } from "../../../../convex/_generated/dataModel";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, Loader2 } from "lucide-react";
import DeleteNoteButton from "@/components/delete-note-button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

function NotesLayout({ children}: { children: React.ReactNode }) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });

  const pathname = usePathname();
  const pathNoteId = pathname.split("/").pop() as Id<"notes"> | undefined;

  const hasNotes = notes && notes.length > 0;

  return (
    <main className="space-y-8 mr-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Notes</h1>
        <CreateNoteButton />
      </div>

    {(notes === null || notes === undefined) && (
      <div className="flex gap-8">
        <div className="w-[280px] flex-shrink-0">
          <div className="mb-4 px-2">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-1 w-20" />
          </div>
          
          <div className="space-y-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="border rounded-lg p-3 animate-pulse">
                <Skeleton className="h-5 w-4/5 mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 w-full">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-purple-400 animate-spin mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading notes...</p>
            </div>
          </div>
        </div>
      </div>
    )} 
     
    {hasNotes === false && (
      // <div className="py-16 flex flex-col justify-center items-center gap-8 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-8 my-6">
      //   <FileText className="h-16 w-16 text-gray-400 mb-4" />
      //   <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">You have no notes yet</h2>
      //   <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
      //     Create your first note to get started with your second brain
      //   </p>
      // </div>
      <div className="py-16 flex flex-col justify-center items-center gap-8 rounded-lg border border-dashed border-gray-300  dark:border-gray-700  px-8 my-6">
         <Image
           src="/notes.svg"
           width="220"
           height="220"
           alt="a picture of a girl holding documents"
           className="drop-shadow-md"
         />
         <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">You have no notes yet</h2>
         <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
           Create your first note to get started
         </p>
         <CreateNoteButton/>
       </div>      
    )}
    
    {hasNotes && (
     <div className="flex gap-8">
      <div className="w-[280px] flex-shrink-0">
        <div className="mb-4 px-2">
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">My Notes</h2>
          <div className="h-1 w-20 bg-purple-400 rounded mt-1"></div>
        </div>
        
        <ul className="space-y-3">
          {notes?.map((note) => (
            <li 
              key={note._id} 
              className={cn(
                "rounded-lg border transition-all duration-200 hover:shadow-md",
                {
                  "border-purple-400 bg-purple-400/10": note._id === pathNoteId,
                  "border-gray-200 dark:border-gray-700 hover:border-purple-200": note._id !== pathNoteId,
                }
              )}
            >
              <div className="flex justify-between items-start p-3">
                <Link
                  href={`/dashboard/notes/${note._id}`}
                  className="block flex-1"
                >
                  <p className={cn("font-medium transition-all duration-200 line-clamp-1", {
                    "text-purple-500 dark:text-purple-300": note._id === pathNoteId,
                    "text-gray-700 dark:text-gray-300": note._id !== pathNoteId,
                  })}>
                    {note.text.substring(0, 28) || "Untitled Note"}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(note._creationTime).toLocaleDateString()}</span>
                  </div>
                </Link>
                <DeleteNoteButton noteId={note._id} />
              </div>
            </li>
          ))}
          
          {/* {notes?.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <FileText className="h-10 w-10 mb-2 opacity-50" />
              <p>No notes yet</p>
              <p className="text-sm">Create your first note to get started</p>
            </div>
          )} */}
        </ul>
      </div>

     <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6 w-full shadow-lg">
      {children}
     </div>
    </div>    
    )}

    </main>
  );
}

export default NotesLayout;
