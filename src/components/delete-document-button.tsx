"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import LoadingButton from "./loading-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

function DeleteDocumentButton({ documentId }: { documentId: Id<"documents"> }) {
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2 cursor-pointer"
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this document?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your document can not be recovered once it&apos;s been deleted
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LoadingButton
            onClick={() => {
              setIsLoading(true);
              deleteDocument({ documentId })
              .then(()=>{
                router.push("/");
              })
              .finally(() => {
                setIsLoading(false);
              });
            }}            
              isLoading={isLoading}
              loadingText="Deleting..."
            >
              Delete
            </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDocumentButton;
