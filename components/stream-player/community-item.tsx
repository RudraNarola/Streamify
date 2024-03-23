"use client";

import toast from "react-hot-toast";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = participantName === hostName;

  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch((e) => toast.error("Something Went Wrong!"));
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Button
          disabled={isPending || isSelf}
          onClick={handleBlock}
          className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          variant={"ghost"}
        >
          <MinusCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
};
