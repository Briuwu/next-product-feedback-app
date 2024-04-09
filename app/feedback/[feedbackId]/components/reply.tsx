import { Button } from "@/components/ui/button";
import { comments } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

type Props = {
  reply: typeof comments.$inferSelect;
  replyTo: string;
};

export const Reply = async ({ reply, replyTo }: Props) => {
  const user = await clerkClient.users.getUser(reply.userId);

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
      <p className="text-grey-600">
        <span className="font-bold text-violet">@{replyTo}</span>{" "}
        {reply.comment}
      </p>
    </div>
  );
};
