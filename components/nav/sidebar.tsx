"use client";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter } from "./filter";

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

      <SheetContent className="bg-grey-100 py-10">
        <Filter />
      </SheetContent>
    </Sheet>
  );
};
