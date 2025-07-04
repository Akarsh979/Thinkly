import { Id } from "../../../../../convex/_generated/dataModel";
import DocumentPageDetail from "@/components/document-page-detail";

async function DocumentPage({params}:{
   params: Promise<{slug: Id<"documents">}>
}){
   const {slug} = await params

   return (
     <main className="pr-12 space-y-8">
     <DocumentPageDetail slug={slug}/>
     </main>
   )
}

export default DocumentPage;