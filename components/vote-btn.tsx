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
import { cn } from "@/lib/utils";

type Props = {
  feedbackId: number;
  scores: number;
};

export const VoteButton = async ({ feedbackId, scores }: Props) => {
  const { userId } = auth();
  const voter = await getVotes(feedbackId, userId!);

  const hasUpvoted = voter?.feedbackId === feedbackId;

  return (
    <>
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
            <Button
              variant={"ghost"}
              className="space-x-2 rounded-[10px] bg-grey-200 px-3 py-[6px] hover:bg-grey-200/80"
            >
              <Image
                src={"/assets/shared/icon-arrow-up.svg"}
                alt=""
                width={10}
                height={7}
              />{" "}
              <span className="text-[13px] font-bold text-blue-500">
                {scores}
              </span>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <form
            action={async () => {
              "use server";
              await updateFeedbackVote(feedbackId);
            }}
          >
            <Button
              variant={"ghost"}
              className={cn(
                "space-x-2 rounded-[10px] bg-grey-200 px-3 py-[6px] hover:bg-grey-200/80",
                hasUpvoted ? "bg-blue-300 hover:bg-blue-300/80" : "",
              )}
            >
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
                {scores}
              </span>
            </Button>
          </form>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
};
