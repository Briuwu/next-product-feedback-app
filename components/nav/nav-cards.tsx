import Link from "next/link";

import { Filter } from "../filter";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Roadmap } from "../roadmap";
import { Sort } from "../sort";
import { getFeedbackStatus } from "@/db/queries";

export const NavCards = async () => {
  const { planned, inProgress, live } = await getFeedbackStatus();
  return (
    <header className="hidden self-start md:mb-10 md:block md:space-y-10 xl:sticky xl:top-6">
      <nav className="grid grid-cols-3 gap-[10px] text-white xl:grid-cols-1">
        <div className="flex gap-4 rounded-[10px] bg-gradient-to-tr from-sky-500 to-pink-500 p-6 xl:h-[137px]">
          <div className="self-end">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/"
                  afterSignUpUrl="/"
                >
                  <Button
                    variant={"ghost"}
                    className="inline-flex space-x-2 p-0"
                  >
                    <LogIn /> <span>Login</span>
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </ClerkLoaded>
            <Link href={"/"} className="block text-[15px] font-bold">
              Frontend Mentor
            </Link>
            <p className="text-[13px] text-opacity-75">Feedback Board</p>
          </div>
        </div>
        <Filter className="h-full" />
        <Roadmap planned={planned} inProgress={inProgress} live={live} />
      </nav>
      <Sort className="xl:hidden" />
    </header>
  );
};
