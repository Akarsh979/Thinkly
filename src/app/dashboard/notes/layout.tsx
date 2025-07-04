"use client";

import CreateNoteButton from "@/components/create-note-button";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

function NotesLayout({ children }: { children: React.ReactNode }) {
  const notes = useQuery(api.notes.getNotes);

  return (
    <main className=" space-y-8 mr-3">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      <ul className="space-y-4">
        {notes?.map((note) => (
          <li key={note._id}>
            <Link
              href={`/dashboard/notes/${note._id}`}
              className="hover:underline"
            >
              <p className="text-gray-700 dark:text-gray-300">
                {note.text.substring(0, 20) + "..."}
              </p>
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Created at: {new Date(note._creationTime).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      {children}

    </main>
  );
}

export default NotesLayout;
