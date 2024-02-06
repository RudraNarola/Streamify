"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const Search = () => {
  function hanldeSubmit() {}

  return (
    <form
      onSubmit={hanldeSubmit}
      className="relative w-full lg:w-[500px] flex items-center gap-1 px-4"
    >
      <Input placeholder="Search" className="focus-visible:ring-1" />
      <Button type="submit" size="sm" variant="ghost">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
