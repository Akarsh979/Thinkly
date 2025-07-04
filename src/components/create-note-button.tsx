"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNoteForm from "./create-note-form";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer flex items-center gap-2">
          <PlusIcon className="w-4 h-4" /> 
          <span className="leading-none">Create Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
             Add your notes and we will make it searchable
          </DialogDescription>
          <CreateNoteForm onNoteCreated={()=>setIsOpen(false)}/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNoteButton;
