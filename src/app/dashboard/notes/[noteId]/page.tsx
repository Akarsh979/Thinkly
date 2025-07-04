import { Id } from "../../../../../convex/_generated/dataModel";
import NoteDetail from "@/components/note-detail";

async function NotesPage({params}:{params: Promise<{noteId: Id<"notes">}>}) {
   const {noteId} = await params;

   return (
     <NoteDetail noteId={noteId} />
   )
}

export default  NotesPage;