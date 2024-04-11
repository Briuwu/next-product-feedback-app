import { getCommentsLength } from "@/db/queries";
import { feedbacks } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { VoteButton } from "./vote-btn";
import { cn } from "@/lib/utils";
type Props = {
  feed: typeof feedbacks.$inferSelect;
  isRoadmap?: boolean;
};

export const Feed = async ({ feed, isRoadmap }: Props) => {
  const commentsLength = await getCommentsLength(feed.id);

  return (
    <div
      className={cn(
        "grid grid-cols-3 items-center rounded-[10px] bg-white p-6 text-[13px] md:grid-cols-[min-content,auto,max-content]",
        isRoadmap && "p-0 md:grid-cols-none",
      )}
    >
      <VoteButton
        feedbackId={feed.id}
        scores={feed.scores}
        isRoadmap={isRoadmap}
      />
      <Link
        href={`/feedback/${feed.id}`}
        className={cn(
          "group col-span-full block md:col-start-2 md:row-start-1",
          isRoadmap && "md:col-start-auto md:row-start-1",
        )}
      >
        <p className="mb-2 font-bold text-blue-500 group-hover:text-blue-300 md:text-lg">
          {feed.title}
        </p>

        <p className="mb-3 text-grey-600 md:text-base">{feed.detail}</p>
        <div className="mb-4">
          <span className="rounded-[10px] bg-grey-200 px-4 py-1 font-semibold capitalize text-blue-300">
            {feed.category}
          </span>
        </div>
      </Link>
      <Link
        href={`/feedback/${feed.id}`}
        className={cn(
          "col-start-3 ml-auto inline-flex space-x-2 rounded-[10px] p-0 md:row-start-1",
          isRoadmap && "md:row-start-2",
        )}
      >
        <Image
          src={"/assets/shared/icon-comments.svg"}
          alt=""
          width={18}
          height={16}
        />
        <span className="text-[13px] font-bold text-blue-500">
          {commentsLength}
        </span>
      </Link>
    </div>
  );
};
