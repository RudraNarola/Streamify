"use client";
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import toast from "react-hot-toast";

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

  const [isfollowPending, startFollowTransition] = useTransition();
  const [isblockPending, startBlockTransition] = useTransition();

  interface CustomToastProps {
    message: string;
  }

  const handleFollow = () => {
    if (isFollowing) {
      startFollowTransition(() => {
        unfollowFunction().then(() => {
          toast.promise(unfollowFunction(), {
            loading: `Unfollowing ${userId}`,
            success: `Unfollowed ${userId}`,
            error: `Failed to unfollow the user ${userId}`,
          });
        });
      });
    } else {
      startFollowTransition(() => {
        followFunction().then(() => {
          toast.promise(followFunction(), {
            loading: `Following ${userId}`,
            success: `Followed ${userId}`,
            error: `Failed to follow the user ${userId}`,
          });
        });
      });
    }
  };

  const handleBlock = () => {
    if (isBlocked) {
      startBlockTransition(() => {
        unblockFunction().then(() => {
          toast.promise(unblockFunction(), {
            loading: `Unblocking ${userId}`,
            success: `Unblocked ${userId}`,
            error: `Failed to unblock the user ${userId}`,
          });
        });
      });
    } else {
      startBlockTransition(() => {
        blockFunction().then(() => {
          toast.promise(blockFunction(), {
            loading: `Blocking ${userId}`,
            success: `Blocked ${userId}`,
            error: `Failed to block the user ${userId}`,
          });
        });
      });
    }
  };
  return (
    <>
      <Button disabled={isfollowPending} onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isblockPending} onClick={handleBlock}>
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  );
};

export default ButtonAction;
