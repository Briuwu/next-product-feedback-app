import Image from "next/image";
import { clerkClient } from "@clerk/nextjs";

import { ReplyDialog } from "./reply-dialog";

import { comments } from "@/db/schema";
import { getReplies } from "@/db/queries";

type Props = {
  comment: typeof comments.$inferSelect;
};

export const Comment = async ({ comment }: Props) => {
  const user = await clerkClient.users.getUser(comment.userId);

  const replies = await getReplies(comment.id);

  if (!user) {
    return null;
  }

  return (
    <div
      className={
        comment.replyingTo === null
          ? "space-y-4 py-6 text-[13px]"
          : "mb-4 space-y-4"
      }
    >
      <div className="flex items-center gap-4">
        <Image
          src={user.imageUrl}
          alt=""
          width={80}
          height={80}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-bold text-blue-500">
            {user.firstName} {user.lastName}
          </p>
          <p className="max-w-20 truncate text-grey-600 md:max-w-40">
            @{user.emailAddresses[0].emailAddress}
          </p>
        </div>
        <ReplyDialog
          commentId={comment.id}
          feedbackId={comment.feedbackId}
          replyingToEmail={user.emailAddresses[0].emailAddress}
        />
      </div>
      <p className="text-grey-600">
        <span className="font-bold text-violet">
          {comment.replyingToEmail}{" "}
        </span>
        {comment.comment}
      </p>
      {replies.length > 0 && (
        <div className={comment.replyingTo === null ? "border-l-2 pl-6" : ""}>
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};
