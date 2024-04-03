"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapse, Collapse, Expand } = useCollapse((state) => state);

  useEffect(() => {
    if (matches) {
      Collapse();
    } else {
      Expand();
    }
  }, [matches, Collapse, Expand]);

  return (
    <div
      className={cn("flex-1", collapse ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
