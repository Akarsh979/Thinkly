"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import LoadingButton from "./loading-button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner"
import { useOrganization } from "@clerk/nextjs";

const noteSchema = z.object({
  text: z.string().min(1, "Note is required").max(5000),
});

type UploadFormValues = z.infer<typeof noteSchema>;

function CreateNoteForm({ onNoteCreated }: { onNoteCreated: () => void }) {
  const createNote = useMutation(api.notes.createNote);
  const organization = useOrganization();

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmitHandler(values: UploadFormValues) {

    await createNote({
      text: values.text,
      orgId: organization.organization?.id,
    });
    toast.success("Note created successfully!");
    onNoteCreated();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-6">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} placeholder="Your note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Creating..."
        >
          Create
        </LoadingButton>
      </form>
    </Form>
  );
}

export default CreateNoteForm;
