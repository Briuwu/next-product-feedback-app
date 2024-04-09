import Link from "next/link";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const Sort = () => {
  return (
    <div className="flex items-center bg-blue-500 px-6 py-[18px]">
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
  const selectItems = [
    { value: "most-upvote", label: "Most Upvote", default: true },
    { value: "least-upvote", label: "Least Upvote" },
    { value: "most-comment", label: "Most Comment" },
    { value: "least-comment", label: "Least Comment" },
  ];
  return (
    <Select>
      <SelectTrigger className="bg-blue-500 font-bold text-white">
        <SelectValue placeholder="Select filter..." />
      </SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem
            defaultChecked={item.default}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
