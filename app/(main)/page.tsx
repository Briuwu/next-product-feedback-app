import { getFeedbacks, getFilteredFeedbacks } from "@/db/queries";
import { EmptyFeed } from "./components/empty-feed";
import { Feed } from "../../components/feed";

const Home = async ({ searchParams }: { searchParams: { filter: string } }) => {
  const category = searchParams.filter || "";

  const feedbacks = await getFeedbacks(category);

  return (
    <div>
      {feedbacks.length === 0 && <EmptyFeed />}
      {feedbacks.length > 0 && (
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
