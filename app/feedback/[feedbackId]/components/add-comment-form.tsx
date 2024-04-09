"use client";
import { useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addComment } from "@/actions/comment";

const formSchema = z.object({
  comment: z.string().min(3),
});

export const AddCommentForm = ({ feedbackId }: { feedbackId: number }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 255;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await addComment(data.comment, feedbackId);
      toast.success("Feedback added successfully");
      form.reset();
    });
  }

  if (!isHydrated) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-[10px] bg-white p-6 text-[13px]"
      >
        <p className="text-lg font-bold text-blue-500">Add Comment</p>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type your comment here"
                  className="resize-none bg-grey-200"
                  maxLength={maxCharCount}
                  onChange={(e) => {
                    setCharCount(e.target.value.length);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage className="pt-1 text-[13px]" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <p className="text-grey-600">
            {maxCharCount - charCount} Characters left
          </p>
          <Button
            disabled={isPending}
            type="submit"
            className="rounded-[10px] font-bold"
          >
            Add Feedback
          </Button>
        </div>
      </form>
    </Form>
  );
};
