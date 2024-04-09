"use client";

import Link from "next/link";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { upsertFeedback } from "@/actions/feedback";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Can't be empty",
    })
    .max(50),
  detail: z
    .string()
    .min(3, {
      message: "Can't be empty",
    })
    .max(500),
  category: z.string().min(3, {
    message: "Can't be empty",
  }),
});

export const AddFeedbackForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      detail: "",
      category: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await upsertFeedback(data);
      toast.success("Feedback added successfully");
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-[13px]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-[13px] font-bold text-blue-500">
                Feedback Title
              </FormLabel>
              <FormDescription className="pb-4 pt-1 text-[13px] text-grey-600">
                Add a short, descriptive headline
              </FormDescription>
              <FormControl>
                <Input placeholder="" {...field} className="bg-grey-100" />
              </FormControl>
              <FormMessage className="pt-1 text-[13px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-[13px] font-bold text-blue-500">
                Category
              </FormLabel>
              <FormDescription className="pb-4 pt-1 text-[13px] text-grey-600">
                Choose a category for your feedback
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-grey-100">
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="enhancement">Enhancement</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="ui">UI</SelectItem>
                  <SelectItem value="ux">UX</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="pt-1 text-[13px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-[13px] font-bold text-blue-500">
                Feedback Detail
              </FormLabel>
              <FormDescription className="pb-4 pt-1 text-[13px] text-grey-600">
                Include any specific comments on what should be improved, added,
                etc.
              </FormDescription>
              <FormControl>
                <Textarea className="resize-none bg-grey-100" {...field} />
              </FormControl>
              <FormMessage className="pt-1 text-[13px]" />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full rounded-[10px] font-bold"
          >
            Add Feedback
          </Button>
          <Button
            disabled={isPending}
            variant={"tertiary"}
            type="submit"
            className="w-full rounded-[10px] font-bold"
            asChild
          >
            <Link href={".."}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
