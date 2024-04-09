"use client";
import { useState, useTransition } from "react";
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
import { addReply } from "@/actions/comment";

const formSchema = z.object({
  comment: z.string().min(3),
});

type Props = {
  commentId: number;
  feedbackId: number | null;
  handleClose: () => void;
  replyingToEmail: string;
};

export const AddReplyForm = ({
  commentId,
  feedbackId,
  handleClose,
  replyingToEmail,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 255;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await addReply(data.comment, feedbackId!, commentId, replyingToEmail);
      toast.success("Feedback added successfully");
      form.reset();
      handleClose();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-[10px] bg-white p-6 text-[13px]"
      >
        <p className="text-lg font-bold text-blue-500">Add Reply</p>
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
            Post Reply
          </Button>
        </div>
      </form>
    </Form>
  );
};
