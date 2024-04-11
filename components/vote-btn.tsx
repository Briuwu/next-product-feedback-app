import { Loader } from "lucide-react";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  auth,
} from "@clerk/nextjs";

import { getVotes } from "@/db/queries";
import { updateFeedbackVote } from "@/actions/feedback";

import { Button } from "./ui/button";
import { VoteButtonForm } from "./vote-btn-form";

type Props = {
  feedbackId: number;
  scores: number;
};

export const VoteButton = async ({ feedbackId, scores }: Props) => {
  const { userId } = auth();
  const voter = await getVotes(feedbackId, userId!);

  const hasUpvoted = voter?.feedbackId === feedbackId;

  return (
    <div className="row-start-2 md:col-start-1 md:row-start-1 md:mr-10">
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
            <Button
              variant={"ghost"}
              className="inline-flex w-[65px] items-center justify-center gap-2 rounded-[10px] bg-grey-200 px-3 py-[6px] hover:bg-blue-300/50 md:w-[47px] md:flex-col md:py-[14px]"
            >
              <>
                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 6l4-4 4 4"
                    stroke="#4661E6"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="text-[13px] font-bold text-blue-500">
                  {scores}
                </span>
              </>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <VoteButtonForm
            feedbackId={feedbackId}
            hasUpvoted={hasUpvoted}
            scores={scores}
          />
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
};
