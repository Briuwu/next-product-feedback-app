import Image from "next/image";
import Link from "next/link";

import { EditFeedbackForm } from "./components/edit-feedback-form";
import { getFeedback } from "@/db/queries";
import { notFound } from "next/navigation";

const EditFeedbackPage = async ({
  params,
}: {
  params: { feedbackId: string };
}) => {
  if (!params.feedbackId) return notFound();

  const feedback = await getFeedback(Number(params.feedbackId));

  if (!feedback) return notFound();

  return (
    <div className="mx-auto max-w-[540px]">
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
      <div className="relative">
        <div className="rounded-[10px] bg-white px-6 py-11">
          <h1 className="mb-6 text-lg font-bold text-blue-500">
            Editing &lsquo;{feedback.title}&lsquo;
          </h1>
          <EditFeedbackForm feedback={feedback} />
        </div>
        <Image
          src={"/assets/shared/icon-new-feedback.svg"}
          alt=""
          width={56}
          height={56}
          className="absolute -top-7 ml-6"
        />
      </div>
    </div>
  );
};
export default EditFeedbackPage;
