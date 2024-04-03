"use client";

import { Follow, User } from "@prisma/client";
import UserCard, { UserItemSkeleton } from "./UserCard";
import { useCollapse } from "@/store/useCollapse";

interface Props {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

const FollowedChannel = ({ data }: Props) => {
  const { collapse } = useCollapse();

  return (
    <div className="h-auto">
      {!collapse && (
        <div className="text-sm text-muted-foreground mb-2 max-lg:hidden">
          FOLLOWED CHANNELS
        </div>
      )}
      <div className="w-full flex gap-y-1 flex-col">
        {data?.map((follow) => {
          return (
            <UserCard
              key={follow.following.id}
              username={follow.following.username}
              imageUrl={follow.following.imageUrl}
              isLive={follow.following.stream?.isLive}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FollowedChannel;

export const FollowedChannelSkeleton = () => {
  return (
    <ul className="px-1">
      {[...Array(4)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
