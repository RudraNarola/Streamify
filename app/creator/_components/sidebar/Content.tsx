"use client";
import { Tv, KeySquare, MessageSquareText, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreatorCollapse } from "@/store/useCreatorCollapse";
import Link from "next/link";

export default function Content() {
  const { collapse } = useCreatorCollapse();

  return (
    <div className={cn(collapse ? "mt-1 pl-2" : "mt-1 pl-2 lg:mt-6")}>
      {!collapse && (
        <div className="flex flex-col space-y-5">
          <Link href="/creator/stream">
            <div className="flex items-center space-x-3">
              <Tv size={24} />
              <span className=" max-lg:hidden">Stream</span>
            </div>
          </Link>

          <Link href="/creator/keys">
            <div className="flex items-center space-x-3">
              <KeySquare size={24} />
              <span className="max-lg:hidden">Keys</span>
            </div>
          </Link>

          <Link href="/creator/chat">
            <div className="flex items-center space-x-3">
              <MessageSquareText size={24} />
              <span className="max-lg:hidden">Chat</span>
            </div>
          </Link>

          <Link href="/creator/community">
            <div className="flex items-center space-x-3">
              <UsersRound size={24} />
              <span className="max-lg:hidden">Community</span>
            </div>
          </Link>
        </div>
      )}
      {collapse && (
        <div className="flex flex-col space-y-5">
          <Link href="">
            <Tv size={24} />
          </Link>
          <Link href="">
            <KeySquare size={24} />
          </Link>
          <Link href="">
            <MessageSquareText size={24} />
          </Link>
          <Link href="">
            <UsersRound size={24} />
          </Link>
        </div>
      )}
    </div>
  );
}
