"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftFromLine,
  ArrowLeftToLine,
  ArrowRightFromLine,
  ArrowRightToLine,
} from "lucide-react";
import { useCollapse } from "@/store/useCollapse";
import { Skeleton } from "@/components/ui/skeleton";

export const Header = () => {
  const { collapse, Expand, Collapse } = useCollapse();

  return collapse === true ? (
    <>
      <Button
        variant="ghost"
        size={"sm"}
        onClick={Expand}
        className="pl-2 w-full justify-center items-center mb-4 hidden lg:flex"
      >
        <ArrowRightToLine className="h-6  w-6" />
      </Button>
    </>
  ) : (
    <div className="flex w-full items-center justify-between mb-2">
      <h4 className="font-semibold text-xl">For You</h4>
      <Button variant="ghost" size={"sm"} onClick={Collapse}>
        <ArrowLeftToLine />
      </Button>
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="pl-2 flex justify-between mx-2 items-center mt-4 mb-2 max-lg:hidden ">
      <Skeleton className="h-6 w-[120px]" />
      <Skeleton className="h-6 w-8 mr-2" />
    </div>
  );
};
