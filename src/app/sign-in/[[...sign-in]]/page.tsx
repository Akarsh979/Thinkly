import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
   <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)]'>
      <SignIn />
   </div>
  )
}