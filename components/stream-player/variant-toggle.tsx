"use client";

import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MessageSquare,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVaraint = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVaraint);
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
