'use client';

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

function NoteDetail({noteId}: {noteId: Id<"notes">}) {
   const note = useQuery(api.notes.getNote, {
      noteId: noteId
   }); 
   
   return (
      <div>
         {note?.text}
      </div>
   )
}

export default NoteDetail;