"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter } from "../filter";
import { Roadmap } from "../roadmap";

export const Sidebar = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const handleClose = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Image
          src={"/assets/shared/icon-hamburger.svg"}
          alt=""
          width={20}
          height={17}
        />
      </SheetTrigger>

      <SheetContent className="space-y-6 bg-grey-100 pt-16">
        <Filter handleClose={handleClose} />
        <Roadmap />
      </SheetContent>
    </Sheet>
  );
};
