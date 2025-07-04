'use client';

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "./loading-button";

export default function DeleteNoteButton({ 
  noteId, 
  onSuccess 
}: { 
  noteId: Id<"notes">;
  onSuccess?: () => void;
}) {
  const deleteNote = useMutation(api.notes.deleteNote);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteNote({ noteId });
      toast.success("Note deleted successfully");
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/notes");
      }
    } catch (error) {
      toast.error("Failed to delete note");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 rounded-full opacity-70 hover:opacity-100 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/40"
          aria-label="Delete note"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Note</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this note? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {isDeleting ? (
            <LoadingButton 
              isLoading={true} 
              loadingText="Deleting..."
            >
              Delete
            </LoadingButton>
          ) : (
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 