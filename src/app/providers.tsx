'use client'

import ThemeProvider  from "@/components/theme/theme-provider";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { dark, neobrutalism } from '@clerk/themes'
import { useThemeStore } from "@/store/theme-store";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);


function Providers({children}:{children: React.ReactNode}){
   
  const {isDarkMode} = useThemeStore()

   return (
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: isDarkMode ? dark : undefined,
      }}
      >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
    </ThemeProvider>
   )
}

export default Providers;