"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props {
  imageUrl: string;
  username: string;
  isLive?: boolean | false;
}

const UserCard = ({ imageUrl, username, isLive }: Props) => {
  const { collapse } = useCollapse();
  const pathname = usePathname();
  const href = `/${username}`;
  const isActive = pathname === href;

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
          <Avatar
            className={
              (cn("ring-2 ring-red-400 border-background object-contain"),
              true ? "ring-green-500" : "ring-gray-600")
            }
          >
            <AvatarImage
              src={imageUrl}
              className="object-contain"
              alt="user img"
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          {!collapse && <p className="text-ellipsis">{username}</p>}
        </div>
        {isLive ? (
          <div className="bg-green-500 px-2 py-1 text-sm rounded-sm ">Live</div>
        ) : null}
      </Link>
    </Button>
  );
};

export default UserCard;

interface UserCardSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserCardSkeleton = ({ size }: UserCardSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
