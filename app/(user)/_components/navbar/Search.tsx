"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

const Search = () => {
  function handleSubmit() {}

  const [search, setSearch] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const handleClear = () => {
    setSearch('');
  }

  console.log(search);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full lg:w-[500px] flex items-center gap-1 px-4"
    >
    

      
      <Input placeholder="Search" value={search} onChange={handleChange} className="focus-visible:ring-1"  />
      {search && (
        <Button onClick={handleClear} size="sm" variant="ghost">
          X
        </Button>
      )}
      <Button type="submit" size="sm" variant="ghost">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>


    </form>
  );
};

export default Search;
