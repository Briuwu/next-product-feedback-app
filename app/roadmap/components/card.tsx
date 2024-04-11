import { feedbacks } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Feed } from "@/components/feed";

type Props = {
  item: typeof feedbacks.$inferSelect;
};

export const Card = ({ item }: Props) => {
  const isPlanned = item.status === "planned";
  const isInProgress = item.status === "in-progress";
  const isLive = item.status === "live";
  return (
    <div
      className={cn(
        "rounded-[10px] border-t-4 bg-white p-6",
        isPlanned && "border-violet",
        isInProgress && "border-orange-300",
        isLive && "border-blue-200",
      )}
    >
      <div className="mb-4 flex items-center gap-4">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            isPlanned && "bg-violet",
            isInProgress && "bg-orange-300",
            isLive && "bg-blue-200",
          )}
        />
        <span className="text-[13px] capitalize text-grey-600">
          {item.status}
        </span>
      </div>
      <Feed feed={item} isRoadmap />
    </div>
  );
};
