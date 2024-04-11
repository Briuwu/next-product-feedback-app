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
import { updateFeedback, upsertFeedback } from "@/actions/feedback";
import { toast } from "sonner";
import { feedbacks } from "@/db/schema";
import { cn } from "@/lib/utils";

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
  status: z.string().min(3, {
    message: "Can't be empty",
  }),
});

type Props = {
  feedback: typeof feedbacks.$inferSelect;
};

export const EditFeedbackForm = ({ feedback }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: feedback.title,
      detail: feedback.detail,
      category: feedback.category,
      status: feedback.status,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await updateFeedback(feedback.id, data);
      toast.success("Feedback edited successfully");
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
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-[13px] font-bold text-blue-500">
                Update Status
              </FormLabel>
              <FormDescription className="pb-4 pt-1 text-[13px] text-grey-600">
                Change feature state
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-grey-100">
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In-Progress</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
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
        <div className="space-y-4 md:flex md:flex-row-reverse md:items-center md:gap-4 md:space-y-0">
          <Button
            disabled={isPending}
            type="submit"
            className="w-full rounded-[10px] font-bold md:w-auto md:px-6 md:py-3"
          >
            Add Feedback
          </Button>
          <Button
            disabled={isPending}
            variant={"tertiary"}
            type="submit"
            className="w-full rounded-[10px] font-bold md:w-auto md:px-6 md:py-3"
            asChild
          >
            <Link
              href={`/feedback/${feedback.id}`}
              className={cn(
                isPending ? "pointer-events-none" : "pointer-events-auto",
              )}
            >
              Cancel
            </Link>
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            className="mr-auto w-full rounded-[10px] font-bold md:w-auto md:px-6 md:py-3"
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};
