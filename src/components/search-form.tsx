"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Dispatch, SetStateAction } from "react";
import { useOrganization } from "@clerk/nextjs";

const formSchema = z.object({
  search: z.string().min(1, "Message is required"),
});

type SearchFormValues = z.infer<typeof formSchema>;

function SearchForm({
  setResults,
  setIsLoading,
}: {
  setResults: (notes: typeof api.search.searchAction._returnType) => void;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchAction = useAction(api.search.searchAction);
  const organization = useOrganization();

  async function onSubmitHandler(values: SearchFormValues) {
    if (setIsLoading) {
      setIsLoading(true);
    }

    try {
      const results = await searchAction({
        search: values.search,
        orgId: organization.organization?.id,
      });
      setResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      form.reset();
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex gap-2"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1 m-0">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search over all your notes and documents using vector search"
                    autoComplete="off"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="icon">
            <Search className="size-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchForm;
