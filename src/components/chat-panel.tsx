import { Button } from "./ui/button";
import { Input } from "./ui/input";

function ChatPanel(){
   return (
    <div className="w-[300px] bg-gray-900 flex flex-col gap-2 p-4 h-full">

      <div className="h-full overflow-y-auto space-y-2">
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
         <div className="p-4 bg-gray-800">Hello</div>
      </div>

      <div className="flex gap-1"> 
      <form onSubmit={(e)=>{
            e.preventDefault();
            //TODO: call convex
      }}>  
      <Input required name="text"/>
      <Button>Submit</Button>
      </form> 
      </div>
    </div>

   )
}

export default ChatPanel;