"use client";

import { useChatSidebar } from "@/store/useChatSidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "../ui/button";

export const ChatToggle = () => {
  const { collapse, Expand, Collapse } = useChatSidebar((state) => state);

  const Icon = collapse ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapse) {
      Expand();
    } else {
      Collapse();
    }
  };

  return (
    <Button
      onClick={onToggle}
      variant={"ghost"}
      className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};
