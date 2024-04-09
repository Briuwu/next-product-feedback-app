"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddReplyForm } from "./add-reply-form";

type Props = {
  commentId: number;
  feedbackId: number | null;
  replyingToEmail: string;
};

export const ReplyDialog = ({
  commentId,
  feedbackId,
  replyingToEmail,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="ml-auto p-0 text-blue-300">
          Reply
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddReplyForm
          commentId={commentId}
          feedbackId={feedbackId}
          handleClose={handleClose}
          replyingToEmail={replyingToEmail}
        />
      </DialogContent>
    </Dialog>
  );
};
