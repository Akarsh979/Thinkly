'use client'

import { cn } from "@/lib/utils";
import { ThemeProvider as NextThemeProvider,ThemeProviderProps } from "next-themes";

interface ExtentedThemeProviderProps extends ThemeProviderProps{
   containerClassName?: string,
}

function ThemeProvider({children,containerClassName,...props}:ExtentedThemeProviderProps){
   return (
     <NextThemeProvider {...props}>
      <main className={cn("container mx-auto",containerClassName)}>
         {children}
       </main>
     </NextThemeProvider>

   )
}

export default ThemeProvider;