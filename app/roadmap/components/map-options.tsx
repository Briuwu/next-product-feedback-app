"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const MapOptions = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const options = [
    {
      name: "Planned",
      href: "planned",
      isActive:
        !searchParams.get("map") || searchParams.get("map") === "planned",
    },
    {
      name: "In Progress",
      href: "in-progress",
      isActive: searchParams.get("map") === "in-progress",
    },
    {
      name: "Live",
      href: "live",
      isActive: searchParams.get("map") === "live",
    },
  ];

  const handleClick = (opt: string) => {
    const params = new URLSearchParams(searchParams);
    if (opt) {
      params.set("map", opt);
    } else {
      params.delete("map");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="grid grid-cols-3 md:hidden">
      {options.map((opt) => (
        <Button
          variant={"ghost"}
          key={opt.href}
          onClick={() => handleClick(opt.href)}
          className={cn(
            "rounded-none border-b-2 py-4 hover:border-violet",
            opt.isActive && "border-violet",
          )}
        >
          {opt.name}
        </Button>
      ))}
    </div>
  );
};
