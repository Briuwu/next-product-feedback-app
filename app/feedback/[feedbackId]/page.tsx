import Image from "next/image";
import Link from "next/link";

import { getFeedback } from "@/db/queries";

import { Feed } from "@/components/feed";
import { FeedComments } from "./components/feed-comments";
import { AddCommentForm } from "./components/add-comment-form";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const DynamicFeedbackPage = async ({
  params,
}: {
  params: { feedbackId: string };
}) => {
  const user = await currentUser();
  const feedId = parseInt(params.feedbackId);
  const data = await getFeedback(feedId);

  const isCreator = data.userId === user!.id;

  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={".."}
          className="inline-flex items-center gap-4 text-[13px] hover:underline"
        >
          <Image
            src={"/assets/shared/icon-arrow-left.svg"}
            alt=""
            width={7}
            height={10}
          />{" "}
          <span className="font-bold text-grey-600">Go Back</span>
        </Link>
        {isCreator && (
          <Button variant={"secondary"} asChild>
            <Link href={`/feedback/${feedId}/edit`}>Edit Feedback</Link>
          </Button>
        )}
      </div>
      <div className="space-y-6">
        <Suspense fallback={null}>
          <Feed feed={data} />
        </Suspense>
        <Suspense fallback={null}>
          <FeedComments feedbackId={feedId} />
        </Suspense>
        <Suspense fallback={null}>
          <AddCommentForm feedbackId={feedId} />
        </Suspense>
      </div>
    </div>
  );
};
export default DynamicFeedbackPage;
