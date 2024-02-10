"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imageUrl: string;
  username: string;
}
const UserCard = ({ imageUrl, username }: Props) => {
  const isActive = false;
  const { collapse } = useCollapse();
  return (
    <Button
      asChild
      className={cn(
        "w-full h-12 px-1 py-4",
        collapse === true ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
      variant={"ghost"}
    >
      <Link href={`/${username}`}>
        <div
          className={cn(
            "flex items-center gap-x-2 w-full",
            collapse && "justify-center"
          )}
        >
          {/*  if live then ring should have color red & have live badge */}
          <Avatar className="ring-2 ring-gray-600 border-background">
            <AvatarImage
              src={imageUrl}
              className="object-contain"
              alt="user img"
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          {!collapse && <p className="text-ellipsis">{username}</p>}
        </div>
      </Link>
    </Button>
  );
};

export default UserCard;
