"use client";
import React, { useEffect } from "react";
import FollowedChannel from "./FollowedChannel";
import RecommendChannel from "./RecommendChannel";
import Header from "./Header";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";

const Sidebar = () => {
  const { collapse } = useCollapse();

  useEffect(() => {
    console.log("changes");
  }, [window.length]);

  return (
    <>
      <div
        className={cn(
          "w-[60px] h-full bg-[#222222] p-2",
          collapse === false ? "lg:w-60" : "",
          "transition transform duration-300 ease-in-out overflow-y-auto scrollbar-hide"
        )}
      >
        <Header />
        <FollowedChannel />
        <RecommendChannel />
      </div>
    </>
  );
};

export default Sidebar;
