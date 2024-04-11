import { getFeedbacks } from "@/db/queries";
import { EmptyFeed } from "./components/empty-feed";
import { Feed } from "../../components/feed";
import { Sort } from "@/components/sort";

const Home = async ({
  searchParams,
}: {
  searchParams: { filter: string; sort: string };
}) => {
  const category = searchParams.filter || "";
  const sort = searchParams.sort || "most-upvote";

  let feedbacks = await getFeedbacks(category, sort);

  return (
    <div>
      <Sort className="hidden xl:mb-6 xl:flex" />
      {feedbacks.length === 0 ? (
        <EmptyFeed />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {feedbacks.map((feed) => (
            <Feed key={feed.id} feed={feed} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
