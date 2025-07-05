'use client';

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { FileX } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";

function NoteDetail({noteId}: {noteId: string}) {
  const router = useRouter();
  
  // Wrap the query in a try/catch to handle invalid IDs
  let validId = true;
  try {
    // Using a valid ID check before the query
    const note = useQuery(api.notes.getNote, {
      noteId: noteId as Id<"notes">
    });
    
    // If we successfully queried but got no note
    if (note === null) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <FileX className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
            Note not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
            The note you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button onClick={() => router.push('/dashboard/notes')}>
            Back to Notes
          </Button>
        </div>
      );
    }
    
    // Show loading state while note is being fetched
    if (note === undefined) {
      return (
        <div className="animate-pulse p-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      );
    }
    
    // Render the actual note
    return (
      <div className="prose prose-gray dark:prose-invert max-w-none whitespace-pre-line">
        {note.text}
      </div>
    );
    
  } catch (error) {
    // If there's an error with the ID format or query
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <FileX className="h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
          Invalid Note ID
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
          The note ID format is invalid.
        </p>
        <Button onClick={() => router.push('/dashboard/notes')}>
          Back to Notes
        </Button>
      </div>
    );
  }
}

export default NoteDetail;