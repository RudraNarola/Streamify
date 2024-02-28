"use client";
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

const ButtonAction = ({
  isFollowing,
  isBlocked,
  userId,
}: {
  isFollowing: boolean;
  isBlocked: boolean;
  userId: string;
}) => {
  const unfollowFunction = async () => {
    const result = await onUnfollow(userId);
  };

  const followFunction = async () => {
    const result = await onFollow(userId);
  };

  const unblockFunction = async () => {
    const result = await onUnblock(userId);
  };

  const blockFunction = async () => {
    const result = await onBlock(userId);
  };

  const handleFollow = () => {
    if (isFollowing) {
      unfollowFunction();
    } else {
      followFunction();
    }
  };

  const handleBlock = () => {
    if (isBlocked) {
      unblockFunction();
    } else {
      blockFunction();
    }
  };

  return (
    <>
      <Button onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock}>{isBlocked ? "Unblock" : "Block"}</Button>
    </>
  );
};

export default ButtonAction;
