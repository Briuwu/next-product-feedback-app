import Image from "next/image";
import Link from "next/link";

import { AddFeedbackForm } from "./components/add-feedback-form";

const AddFeedbackPage = () => {
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
      <div className="relative">
        <div className="rounded-[10px] bg-white px-6 py-11">
          <h1 className="mb-6 text-lg font-bold text-blue-500">
            Create New Feedback
          </h1>
          <AddFeedbackForm />
        </div>
        <Image
          src={"/assets/shared/icon-new-feedback.svg"}
          alt=""
          width={56}
          height={56}
          className="absolute -top-7 ml-6"
        />
      </div>
    </>
  );
};
export default AddFeedbackPage;
