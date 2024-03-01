"use client";
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

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



  const handleFollow = () => {


    if (isFollowing) {
      startFollowTransition(() => {

        unfollowFunction().then(() => {
          toast.success("Unfollowed the user");
        }).catch(() => {
          toast.error("Failed to unfollow the user");
        })
      });
    } else {
      startFollowTransition(() => {
        followFunction().then(() => {
          toast.success("Followed the user");
        }).catch(() => {
          toast.error("Failed to follow the user");
        })
      });
    }

  };

  const handleBlock = () => {


    if (isBlocked) {
      startBlockTransition(() => {
        unblockFunction().then(() => {
          toast.success("Unblocked the user");
        }).catch(() => {
          toast.error("Failed to unblock the user");
        });
      });
    } else {
      startBlockTransition(() => {
        blockFunction().then(() => {
          toast.success("Blocked the user");
        }).catch(() => {
          toast.error("Failed to block the user");
        });
      });
    }

  };
  return (
    <>
      <Button disabled={isfollowPending} onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isblockPending} onClick={handleBlock}>{isBlocked ? "Unblock" : "Block"}</Button>
    </>
  );
};

export default ButtonAction;
