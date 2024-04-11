"use client";
import { useTransition, useOptimistic } from "react";
import { updateFeedbackVote } from "@/actions/feedback";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  scores: number;
  hasUpvoted: boolean;
  feedbackId: number;
};

export const VoteButtonForm = ({ hasUpvoted, scores, feedbackId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticVote, addOptimisticVote] = useOptimistic(
    scores,
    (state) => state + (hasUpvoted ? -1 : 1),
  );

  const handleSubmit = () => {
    startTransition(async () => {
      addOptimisticVote(scores);
      await updateFeedbackVote(feedbackId);
    });
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={isPending}
      variant={"ghost"}
      className={cn(
        "inline-flex w-[65px] items-center justify-center gap-2 rounded-[10px] bg-grey-200 px-3 py-[6px] hover:bg-blue-300/50 md:w-[47px] md:flex-col md:py-[14px]",
        hasUpvoted ? "bg-blue-300 hover:bg-blue-300/80" : "",
      )}
    >
      <>
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            className={hasUpvoted ? "stroke-white" : ""}
          />
        </svg>
        <span
          className={cn(
            "text-[13px] font-bold text-blue-500",
            hasUpvoted ? "text-white" : "",
          )}
        >
          {optimisticVote}
        </span>
      </>
    </Button>
  );
};
