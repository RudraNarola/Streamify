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
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar } from "@/components/user-avatar";


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
  username: string;
  imageUrl: string;
  isLive?: boolean | false;
 
  
}

const UserCard = ({ username, imageUrl,  isLive  }: Props) => {
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
      <div className={cn(
          "flex items-center w-full gap-x-4 ",
          collapse && "justify-center",
        )}>
          <UserAvatar
            imageUrl={imageUrl} 
            username={username}
            isLive={isLive}
          />
          {!collapse && (
            <p className="truncate">
              {username}
            </p>
          )}
          {!collapse && isLive && (
            <LiveBadge className="ml-auto" />
          )}
        </div>
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
