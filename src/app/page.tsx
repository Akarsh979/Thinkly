import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileText, FileUp } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage(){
   const {userId} = await auth();
   if (userId) {
     redirect("/dashboard");
   }

   return (
      <div className="flex flex-col min-h-screen">
         {/* Hero Section */}
         <main className="flex-1">
            <section className="relative py-20 md:py-32 overflow-hidden">
               <div className="container mx-auto px-4 md:px-6">
                  <div className="flex flex-col items-center text-center space-y-8">
                     <div className="relative h-16 w-16 md:h-24 md:w-24 mb-4">
                        <Image 
                           src="/logo.png" 
                           alt="Thinkly Logo" 
                           fill
                           className="object-contain"
                           priority
                        />
                     </div>
                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                           Thinkly - Your Second Brain
                        </span>
                     </h1>
                     <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                        Organize your thoughts, notes, and documents in one place. Thinkly helps you think clearly.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                           <Button size="lg" className="gap-2">
                              Get Started <ArrowRight />
                           </Button>
                        </SignInButton>
                        {/* <Link href="/dashboard/documents">
                           <Button variant="outline" size="lg">
                              Explore Features
                           </Button>
                        </Link> */}
                     </div>
                  </div>
               </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/40">
               <div className="container mx-auto px-4 md:px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                     Unlock Your Knowledge Potential
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Feature 1 */}
                     <div className="bg-card rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                           <FileText className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Manage Your Documents</h3>
                        <p className="text-muted-foreground">
                           Easily organize and access all your text documents in one centralized location.
                        </p>
                     </div>

                     {/* Feature 2 */}
                     <div className="bg-card rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                           <Brain className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Your Second Brain</h3>
                        <p className="text-muted-foreground">
                           Thinkly acts as your external memory, helping you connect ideas and retrieve information effortlessly.
                        </p>
                     </div>

                     {/* Feature 3 */}
                     <div className="bg-card rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                           <FileUp className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">PDF Support Coming Soon</h3>
                        <p className="text-muted-foreground">
                           We&apos;re expanding our capabilities. Soon you&apos;ll be able to upload, search, and manage PDF documents.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
               <div className="container mx-auto px-4 md:px-6">
                  <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl p-8 md:p-12 text-center">
                     <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to organize your knowledge?</h2>
                     {/* <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of users who are already benefiting from having a second brain.
                     </p> */}
                     <Link href="/dashboard">
                        <Button size="lg">
                           Start Using Thinkly Today
                        </Button>
                     </Link>
                  </div>
               </div>
            </section>
         </main>

         {/* Footer */}
         <footer className="py-6 border-t">
            <div className="container mx-auto px-4 md:px-6">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="relative h-8 w-8">
                        <Image 
                           src="/logo.png" 
                           alt="Thinkly Logo" 
                           fill
                           className="object-contain"
                        />
                     </div>
                     <p className="font-medium">Thinkly</p>
                  </div>
                  <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Thinkly. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </div>
   )
}