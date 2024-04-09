import Image from "next/image";
import Link from "next/link";

import { getFeedback } from "@/db/queries";

import { Feed } from "@/components/feed";
import { FeedComments } from "./components/feed-comments";
import { AddCommentForm } from "./components/add-comment-form";

const DynamicFeedbackPage = async ({
  params,
}: {
  params: { feedbackId: string };
}) => {
  const feedId = parseInt(params.feedbackId);
  const data = await getFeedback(feedId);

  return (
    <>
      <div className="mb-[55px]">
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
      </div>
      <div className="space-y-6">
        <Feed feed={data} />
        <FeedComments feedbackId={feedId} />
        <AddCommentForm feedbackId={feedId} />
      </div>
    </>
  );
};
export default DynamicFeedbackPage;
