"use client";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter } from "../filter";
import { Roadmap } from "../roadmap";

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={"/assets/shared/icon-hamburger.svg"}
          alt=""
          width={20}
          height={17}
        />
      </SheetTrigger>

      <SheetContent className="space-y-6 bg-grey-100 pt-16">
        <Filter />
        <Roadmap />
      </SheetContent>
    </Sheet>
  );
};
