import { SignInButton, UserButton } from "@clerk/nextjs"
import { Unauthenticated, Authenticated, AuthLoading } from "convex/react"

function HeaderAction(){
   return <>
         <Unauthenticated>
           <SignInButton />
         </Unauthenticated>
   
         <Authenticated>
           <UserButton/>
         </Authenticated> 
   
         <AuthLoading>
           <p>Loading...</p>
         </AuthLoading>
         </>
}

export default HeaderAction