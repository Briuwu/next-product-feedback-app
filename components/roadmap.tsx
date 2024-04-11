import Link from "next/link";

type Props = {
  planned: number;
  inProgress: number;
  live: number;
};

export const Roadmap = ({ planned, inProgress, live }: Props) => {
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
          <span className="ml-auto font-bold">{planned}</span>
        </div>
        <div className="flex items-center gap-4 text-grey-600">
          <div className="h-2 w-2 rounded-full bg-violet" />
          <p>In Progress</p>
          <span className="ml-auto font-bold">{inProgress}</span>
        </div>
        <div className="flex items-center gap-4 text-grey-600">
          <div className="h-2 w-2 rounded-full bg-blue-200" />
          <p>Live</p>
          <span className="ml-auto font-bold">{live}</span>
        </div>
      </div>
    </div>
  );
};
