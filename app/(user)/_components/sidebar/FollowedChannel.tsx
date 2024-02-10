"use client";
import { User } from "@prisma/client";
import UserCard from "./UserCard";
import { useCollapse } from "@/store/useCollapse";
import { useEffect } from "react";
import { getFollowedUser } from "@/lib/services/follow.services";

// TODO: User may not be following anyone, so we need to handle that case
interface Props {
  data: User[] | null;
}

const FollowedChannel = ({ data }: Props) => {
  const { collapse } = useCollapse();

  return (
    <div className="h-auto">
      {!collapse && (
        <div className="text-sm font-semibold mb-2 max-lg:hidden">
          FOLLOWED CHANNELS
        </div>
      )}
      <div className="w-full flex gap-y-1 flex-col">
        {data?.map((user) => {
          return (
            <UserCard
              key={user.id}
              imageUrl={user.imageUrl}
              username={user.username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FollowedChannel;
