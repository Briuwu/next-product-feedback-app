import { Button } from "@/components/ui/button";
import { getCommentsLength } from "@/db/queries";
import { feedbacks } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

type Props = {
  feed: typeof feedbacks.$inferSelect;
};

export const Feed = async ({ feed }: Props) => {
  const commentsLength = await getCommentsLength(feed.id);

  return (
    <div className="rounded-[10px] bg-white p-6 text-[13px]">
      <Link href={`/feedback/${feed.id}`} className="block">
        <p className="mb-2 font-bold text-blue-500">{feed.title}</p>

        <p className="mb-3 text-grey-600">{feed.detail}</p>
        <div className="mb-4">
          <span className="rounded-[10px] bg-grey-200 px-4 py-1 font-semibold text-blue-300">
            {feed.category}
          </span>
        </div>
      </Link>
      <div className="flex items-center justify-between">
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
            {feed.score}
          </span>
        </Button>
        <Link
          href={`/feedback/${feed.id}`}
          className="inline-flex space-x-2 rounded-[10px] p-0"
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
    </div>
  );
};
