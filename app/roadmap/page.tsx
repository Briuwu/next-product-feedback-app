import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { MapOptions } from "./components/map-options";
import { getFeedbacks } from "@/db/queries";
import { Card } from "./components/card";

const RoadmapPage = async ({
  searchParams,
}: {
  searchParams: { map: string };
}) => {
  const { map } = searchParams;

  const data = await getFeedbacks();

  const filteredData = data.filter((feed) => {
    if (map) {
      return feed.status === map;
    }
    return true;
  });

  const plannedData = data.filter((feed) => feed.status === "planned");
  const progressData = data.filter((feed) => feed.status === "in-progress");
  const liveData = data.filter((feed) => feed.status === "live");

  return (
    <div className="md:container md:py-[34px]">
      <header className="bg-blue-500 px-6 py-[26px] text-white md:rounded-[10px]">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={"/"}
              className="inline-flex items-center gap-4 text-[13px] hover:underline"
            >
              <Image
                src={"/assets/shared/icon-arrow-left.svg"}
                alt=""
                width={7}
                height={10}
              />{" "}
              <span className="font-bold text-white">Go Back</span>
            </Link>
            <h1 className="text-lg font-bold">Roadmap</h1>
          </div>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                <Button className="rounded-xl font-bold">+ Add Feedback</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button asChild className="rounded-xl font-bold">
                <Link href={"/feedback/add"}>+ Add Feedback</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </header>
      <main>
        <MapOptions />
        <div className="container mt-6 md:hidden">
          <h2 className="text-lg font-bold capitalize">
            {map || "Planned"} ({data.length})
          </h2>
          <p className="text-sm text-grey-600">
            {map === "planned" && "Ideas prioritized for research"}
            {map === "in-progress" && "Currently being developed"}
            {map === "live" && "Released features"}
          </p>
          <div className="gap- my-6 grid">
            {filteredData.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="hidden grid-cols-3 gap-6 md:mt-8 md:grid">
          <div>
            <h2 className="text-lg font-bold capitalize">
              Planned ({plannedData.length})
            </h2>
            <p className="text-sm text-grey-600">
              Ideas prioritized for research
            </p>
            <div className="my-6 grid gap-6">
              {plannedData.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold capitalize">
              In Progress ({progressData.length})
            </h2>
            <p className="text-sm text-grey-600">Currently being developed</p>
            <div className="my-6 grid gap-6">
              {progressData.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold capitalize">
              Live ({liveData.length})
            </h2>
            <p className="text-sm text-grey-600">Released features</p>
            <div className="my-6 grid gap-6">
              {liveData.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default RoadmapPage;
