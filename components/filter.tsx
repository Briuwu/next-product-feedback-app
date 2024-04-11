import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Filter = ({
  handleClose,
  className,
}: {
  handleClose?: () => void;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filters = [
    {
      name: "All",
      href: "",
      isActive: !searchParams.get("filter"),
    },
    {
      name: "UI",
      href: "ui",
      isActive: searchParams.get("filter") === "ui",
    },
    {
      name: "UX",
      href: "ux",
      isActive: searchParams.get("filter") === "ux",
    },
    {
      name: "Enhancement",
      href: "enhancement",
      isActive: searchParams.get("filter") === "enhancement",
    },
    {
      name: "Bug",
      href: "bug",
      isActive: searchParams.get("filter") === "bug",
    },
    {
      name: "Feature",
      href: "feature",
      isActive: searchParams.get("filter") === "feature",
    },
  ];

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    router.replace(`${pathname}?${params.toString()}`);
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-[10px] bg-white p-6",
        className,
      )}
    >
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
  );
};
