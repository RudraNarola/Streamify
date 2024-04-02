"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl({
      url: "/search",
      query: { term: value },
    }, { skipEmptyString: true });

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[500px] flex items-center gap-1 lg:px-4"
    >

      <div className=" relative w-full">

      
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        className="focus-visible:ring-1 focus:ring-blue-400 focus:outline-none border border-gray-600 rounded-md py-2 px-8 w-full"
      />
 {value && (
          <button
            onClick={onClear}
            className="absolute inset-y-0 right-1 flex items-center pr-2 py-2  text-white-100 hover:text-gray-300  text-md font-bold "
          >
            X
          </button>

        )}


</div>
       <Button type="submit" size="sm" variant="ghost">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
