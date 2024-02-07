"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRight, ArrowRightToLine } from "lucide-react";
import { useCollapse } from "@/store/useCollapse";

const Header = () => {
  const { collapse, Expand, Collapse } = useCollapse();

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
        onClick={handleExpansion}
        className="pl-2 flex justify-center items-center"
      >
        <ArrowRightToLine />
      </Button>
    </>
  ) : (
    <div className="flex max-sm:hidden items-center justify-between mb-2">
      <h4 className="font-semibold text-xl">For You</h4>
      <Button variant="ghost" size={"sm"} onClick={handleCollapse}>
        <ArrowLeftToLine />
      </Button>
    </div>
  );
};

export default Header;
