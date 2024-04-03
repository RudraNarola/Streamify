"use client";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";
import { useIsClient } from "usehooks-ts";
import { HeaderSkeleton } from "./Header";
import { FollowedChannelSkeleton } from "./FollowedChannel";
import { RecommendedSkeleton } from "./RecommendChannel";
import { useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient();
  const { collapse } = useCollapse();

  useEffect(() => {
    console.log("Changedd", collapse);
  }, [collapse]);

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <HeaderSkeleton />
        <FollowedChannelSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 w-[70px] h-full bg-[#1b1d24] border-r border-[#2D2E35] z-50 p-2",
        collapse === false ? "lg:w-60" : "",
        "transition transform duration-300 ease-in-out overflow-y-auto scrollbar-hide"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
