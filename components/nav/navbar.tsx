import Link from "next/link";
import { Loader, LogIn, User } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Sidebar } from "./sidebar";
import { Sort } from "../sort";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <header>
      <nav className="flex items-center gap-4 bg-gradient-to-tr from-sky-500 to-pink-500 px-6 py-4 text-white">
        <div className="mr-auto">
          <Link href={"/"} className="text-[15px] font-bold">
            Frontend Mentor
          </Link>
          <p className="text-[13px] text-opacity-75">Feedback Board</p>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
              <Button variant={"ghost"}>
                <LogIn />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </ClerkLoaded>
        <Sidebar />
      </nav>
      <Sort />
    </header>
  );
};
