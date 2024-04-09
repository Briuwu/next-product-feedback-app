import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const EmptyFeed = () => {
  return (
    <div className="bg-white px-6 py-[76px] text-center">
      <Image
        src={"/assets/suggestions/illustration-empty.svg"}
        alt=""
        width={102}
        height={108}
        className="mx-auto mb-10"
      />
      <p className="mb-[14px] text-lg font-bold text-blue-500">
        There is no feedback yet.
      </p>
      <p className="mb-6 text-grey-600">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button className="rounded-[10px] font-bold" asChild>
        <Link href={"/feedback/add"}>+ Add Feedback</Link>
      </Button>
    </div>
  );
};
