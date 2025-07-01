'use client'

import ThemeToggle from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { createDocument } from "../../convex/documents";
import Image from "next/image";
import HeaderAction from "./header-actions";

function Header(){
   return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">  

        <div className="flex items-center gap-3">
         <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
           <div className="relative flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground shadow-sm shadow-primary/20">
             <Image src="/logo.png" width={24} height={24} alt="Thinkly logo" className="rounded-sm"/>
           </div>
           <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
             THINKLY
           </span>
         </div>
        </div>  

        <div className="flex items-center gap-2"> 
         <ThemeToggle/> 
         <HeaderAction/>
        </div>  
    
       </div>
     </header> 
   )
}

export default Header; 