"use client";
import { Button } from "@/components/ui/button";
import {
  followUser,
  isFollowing,
  unFollowUser,
} from "@/lib/services/follow.services";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const unfollowFunction = async () => {
    const result = await unFollowUser(params.id);
    setIsFollowingUser(false);
  };

  const followFunction = async () => {
    const result = await followUser(params.id);
    setIsFollowingUser(true);
  };

  const handleFollow = () => {
    if (isFollowingUser) {
      unfollowFunction();
    } else {
      followFunction();
    }
  };

  useEffect(() => {
    const followingFunction = async () => {
      const result = await isFollowing(params.id);
      setIsFollowingUser(!!result);
    };
    followingFunction();
    console.log("isFollowingUser", isFollowingUser);
  }, []);

  return (
    <>
      <div>User: {params.id}</div>
      <Button onClick={handleFollow}>
        {isFollowingUser ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
};

export default Page;
