"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Sort = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center bg-blue-500 px-6 py-[18px] md:rounded-[10px]",
        className,
      )}
    >
      <div className="mr-8 hidden items-center gap-4 md:flex">
        <Image
          src={"/assets/suggestions/icon-suggestions.svg"}
          alt=""
          width={23}
          height={24}
        />
        <p className="text-lg font-bold text-white">Suggestions</p>
      </div>
      <div className="flex flex-1 items-center text-[13px]">
        <p className="space-x-1 text-white">Sort by: </p>
        <div className="w-full max-w-40">
          <SelectSort />
        </div>
      </div>
      <Button asChild className="rounded-xl font-bold">
        <Link href={"/feedback/add"}>+ Add Feedback</Link>
      </Button>
    </div>
  );
};

const SelectSort = () => {
  const [selected, setSelected] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.has("sort")) {
      setSelected("most-upvote");
    }
  }, [searchParams]);

  const selectItems = [
    { value: "most-upvote", label: "Most Upvote" },
    { value: "least-upvote", label: "Least Upvote" },
    { value: "most-comment", label: "Most Comment" },
    { value: "least-comment", label: "Least Comment" },
  ];

  const handleFilter = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      if (sort === "most-upvote") {
        params.delete("sort");
      } else {
        params.set("sort", sort);
      }
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue="most-upvote"
      value={selected}
      onValueChange={(e) => {
        setSelected(e);
        handleFilter(e);
      }}
    >
      <SelectTrigger className="bg-blue-500 py-0 font-bold text-white">
        <SelectValue placeholder="Select filter..." />
      </SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
