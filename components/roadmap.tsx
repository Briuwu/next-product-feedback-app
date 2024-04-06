import Link from "next/link";
import { Button } from "./ui/button";

export const Roadmap = () => {
  return (
    <div className="rounded-[10px] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-bold text-blue-500">Roadmap</p>
        <Link
          href="/roadmap"
          className="font-semibold text-blue-300 underline hover:text-blue-300/80"
        >
          View
        </Link>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-4 text-grey-600">
          <div className="h-2 w-2 rounded-full bg-orange-300" />
          <p>Planned</p>
          <span className="ml-auto font-bold">2</span>
        </div>
        <div className="flex items-center gap-4 text-grey-600">
          <div className="h-2 w-2 rounded-full bg-violet" />
          <p>In Progress</p>
          <span className="ml-auto font-bold">3</span>
        </div>
        <div className="flex items-center gap-4 text-grey-600">
          <div className="h-2 w-2 rounded-full bg-blue-200" />
          <p>Live</p>
          <span className="ml-auto font-bold">1</span>
        </div>
      </div>
    </div>
  );
};
