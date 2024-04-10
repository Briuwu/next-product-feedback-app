import { getFeedbacks } from "@/db/queries";
import { EmptyFeed } from "./components/empty-feed";
import { Feed } from "../../components/feed";

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
