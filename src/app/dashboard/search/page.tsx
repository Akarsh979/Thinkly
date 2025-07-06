'use client'

import SearchForm from "@/components/search-form";
import { useEffect, useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { FileIcon, Loader2, Notebook, NotebookPen, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
 
function SearchPage(){
   const [results, setResults] = useState<typeof api.search.searchAction._returnType>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [hasSearched, setHasSearched] = useState(false);

   useEffect(() => {
     const storedSearchResults = localStorage.getItem("searchResults");
     if (!storedSearchResults) return;

     setResults(JSON.parse(storedSearchResults));
     setHasSearched(true);
   }, []);

   return (
     <main className="space-y-8 mr-3">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
           Search
         </h1>
       </div>

       <SearchForm 
         setIsLoading={setIsLoading}
         setResults={(searchResults) => {
           setResults(searchResults);
           setHasSearched(true);
           localStorage.setItem("searchResults", JSON.stringify(searchResults));
           setIsLoading(false);
         }}
       />

       {isLoading && (
         <div className="space-y-4">
           {Array(3).fill(0).map((_, i) => (
             <div key={i} className="border border-slate-700/40 rounded-lg p-4 animate-pulse">
               <div className="flex items-center justify-between mb-4">
                 <Skeleton className="h-5 w-24" />
                 <Skeleton className="h-4 w-32" />
               </div>
               <Skeleton className="h-4 w-full mb-2" />
               <Skeleton className="h-4 w-4/5" />
             </div>
           ))}
         </div>
       )}

       {!isLoading && hasSearched && (!results || results.length === 0) && (
         <div className="py-12 flex flex-col justify-center items-center gap-6 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-8">
           <Search className="h-16 w-16 text-gray-400 mb-2" />
           <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No results found</h2>
           <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
             Try searching with different keywords
           </p>
         </div>
       )}

       {!isLoading && results && results.length > 0 && (
         <ul className="space-y-4">
           {results.map((result) => (
             <li 
               key={result.record._id} 
               className="rounded-lg border border-gray-200 dark:border-slate-700 hover:border-black dark:hover:border-purple-200 transition-all duration-200 hover:shadow-md bg-slate-800/40 backdrop-blur-sm"
             >
               {result.type === "notes" ? (
                 <Link 
                   className="block p-4 space-y-3" 
                   href={`/dashboard/notes/${result.record._id}`}
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex gap-2 items-center text-purple-400">
                       <NotebookPen className="h-4 w-4" /> 
                       <span className="font-medium">Note</span>
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-400">
                       Relevancy score: {result.score.toFixed(2)}
                     </div>
                   </div>
                   <div className="text-gray-700 dark:text-gray-300">
                     {result.record.text.substring(0, 300)}
                     {result.record.text.length > 300 ? "..." : ""}
                   </div>
                 </Link>
               ) : (
                 <Link 
                   className="block p-4 space-y-3" 
                   href={`/dashboard/documents/${result.record._id}`}
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex gap-2 items-center text-blue-400">
                       <FileIcon className="h-4 w-4" /> 
                       <span className="font-medium">Document</span>
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-400">
                       Relevancy score: {result.score.toFixed(2)}
                     </div>
                   </div>
                   <div className="space-y-1">
                     <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">
                       {result.record.title}
                     </h3>
                     <p className="text-gray-700 dark:text-gray-300">
                       {result.record.description}
                     </p>
                   </div>
                 </Link>
               )}
             </li>
           ))}
         </ul>
       )}

       {!isLoading && !hasSearched && (
         <div className="py-16 flex flex-col justify-center items-center gap-6 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-8">
           <Image
             src="/search.svg"
             width="200"
             height="200"
             alt="Search illustration"
             className="drop-shadow-md"
           />
           <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
             Search across your notes and documents
           </h2>
           <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
             Enter keywords above to find relevant content
           </p>
         </div>
       )}
     </main>
   );
}

export default SearchPage;