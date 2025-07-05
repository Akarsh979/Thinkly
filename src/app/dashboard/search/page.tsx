'use client'

import SearchForm from "@/components/search-form";
import { useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
 
function SearchPage(){
   const [results,setResults] = useState<typeof api.search.searchAction._returnType>(null);

   console.log(results);

   return (
      <main className=" space-y-8 mr-3">
      <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">Search</h1>  
      </div>

      <SearchForm setResults={setResults}/>

      <ul className="space-y-4">
         {results?.map((result)=>(
           <li key={result.record._id} className="hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
            {result.type === "notes" ? (
               <Link href={`/dashboard/notes/${result.record._id}`}>
                  <div>type: Note {result.score}</div>
                  {result.record.text.substring(0,500) + "..."}
               </Link>
            ) : 
            (
               <Link href={`/dashboard/documents/${result.record._id}`}>
                  <div>type: Document {result.score}</div>
                  {result.record.title}
                  {result.record.description}
               </Link>
            )}
           </li>
         ))}
      </ul>
      </main>
   );
}

export default  SearchPage;