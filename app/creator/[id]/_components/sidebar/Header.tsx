"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRight, ArrowRightToLine } from "lucide-react";
import { useCreatorCollapse } from "@/store/useCreatorCollapse";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const { collapse, Expand, Collapse } = useCreatorCollapse();

  function handleExpansion() {
    Expand();
  }

  function handleCollapse() {
    Collapse();
  }

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
    <div className="flex w-full items-center justify-between ">
      <h4 className="font-semibold text-xl">For You</h4>
      <Button variant="ghost" size={"sm"} onClick={Collapse}>
        <ArrowLeftToLine />
      </Button>
    </div>
  );
};

export default Header;

export const HeaderSkeleton = () => {
  return (
    <div className="pl-2 flex justify-between mx-2 items-center mt-4 mb-2 max-lg:hidden ">
      <Skeleton className="h-6 w-[120px]" />
      <Skeleton className="h-6 w-8 mr-2" />
    </div>
  );
};
