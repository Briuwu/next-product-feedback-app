import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const Filter = () => {
  const params = useSearchParams();
  const router = useRouter();

  const filters = [
    {
      name: "All",
      href: "",
      isActive: !params.get("filter"),
    },
    {
      name: "UI",
      href: "ui",
      isActive: params.get("filter") === "ui",
    },
    {
      name: "UX",
      href: "ux",
      isActive: params.get("filter") === "ux",
    },
    {
      name: "Enhancement",
      href: "enhancement",
      isActive: params.get("filter") === "enhancement",
    },
    {
      name: "Bug",
      href: "bug",
      isActive: params.get("filter") === "bug",
    },
    {
      name: "Feature",
      href: "feature",
      isActive: params.get("filter") === "feature",
    },
  ];

  const handleFilter = (filter: string) => {
    router.push(filter ? `/?filter=${filter}` : "/");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-[10px] bg-white p-6">
        {filters.map((filter) => (
          <Button
            key={filter.name}
            onClick={() => handleFilter(filter.href)}
            className={cn(
              "inline-flex items-center justify-center rounded-[10px] bg-grey-200 px-4 py-2 text-[13px] font-semibold text-blue-300 hover:bg-blue-300 hover:text-white",
              filter.isActive && "bg-blue-300 text-white",
            )}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
