import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";
import React from "react";

const FollowedChannel = () => {
  const { collapse } = useCollapse();

  return (
    <div
      className={cn(
        "h-1/2 text-sm font-semibold",
        collapse === true ? "hidden" : ""
      )}
    >
      FOLLOWED CHANNELS
    </div>
  );
};

export default FollowedChannel;
