import { Button } from "@/components/ui/button";
import { comments } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { Reply } from "./reply";
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
    <div className="space-y-4 py-6 text-[13px]">
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
        <Button variant={"ghost"} className="ml-auto p-0 text-blue-300">
          Reply
        </Button>
      </div>
      <p className="text-grey-600">{comment.comment}</p>
      {replies.length > 0 && (
        <div className="border-l-2 pl-6">
          {replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              replyTo={user.emailAddresses[0].emailAddress}
            />
          ))}
        </div>
      )}
    </div>
  );
};
