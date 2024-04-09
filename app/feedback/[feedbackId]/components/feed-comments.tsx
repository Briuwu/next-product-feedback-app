import { getComments, getCommentsLength } from "@/db/queries";
import { Comment } from "./comment";

export const FeedComments = async ({ feedbackId }: { feedbackId: number }) => {
  const data = await getComments(feedbackId);
  const commentsLength = getCommentsLength(feedbackId);

  return (
    <div className="rounded-[10px] bg-white p-6 text-[13px]">
      <p className="text-lg font-bold text-blue-500">
        {commentsLength} Comment(s)
      </p>
      <div className="divide-y-2">
        {data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
