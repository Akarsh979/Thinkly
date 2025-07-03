import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  text: z.string().min(1, "Message is required"),
});

type QuestionFormValues = z.infer<typeof formSchema>;

function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const askQuestion = useAction(api.documents.askQuestion);
  
  async function onSubmitHandler(values: QuestionFormValues) {
    const text = values.text;
    form.reset();
    await askQuestion({ question: text, documentId });
  }

  return (
    <div className="pt-4 border-t">
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-1 m-0">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type your message..."
                    autoComplete="off"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="icon">
            <SendHorizontal className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default QuestionForm;
