"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

const Search = () => {
  function handleSubmit() {}

  const [search, setSearch] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch("");
  };

  console.log(search);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full lg:w-[500px] flex items-center gap-1 px-4"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          className="focus-visible:ring-1 focus:ring-blue-400 focus:outline-none border border-gray-600 rounded-md py-2 px-4 w-full"
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center px-2 py-2  text-white-100 hover:text-gray-300  text-md font-bold "
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

export default Search;
