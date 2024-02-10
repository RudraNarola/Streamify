"use server";
import { use } from "react";
import { db } from "../database";
import { getUser, getUserByUsername } from "./user.services";

export async function isFollowing(name: string) {
  let user;
  try {
    user = await getUser();
  } catch (error) {
    console.error("Current user is not found", error);
  }

  let otherUser;
  try {
    otherUser = await getUserByUsername(name);
  } catch (error) {
    console.error("User is not found", error);
  }

  // console.log(user, otherUser);

  if (!user || !otherUser) {
    console.error("User or other user is not found");
    return null;
  }

  const result = await db.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  });

  // console.log("result", result);

  return !!result;
}

export async function followUser(name: string) {
  let user;
  try {
    user = await getUser();
  } catch (error) {
    console.error("Current user is not found", error);
  }

  let otherUser;
  try {
    otherUser = await getUserByUsername(name);
  } catch (error) {
    console.error("User is not found", error);
  }

  if (!user || !otherUser) {
    console.error("User or other user is not found");
    return null;
  }

  const result = await db.follow.create({
    data: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  });

  console.log("unfollow", result);

  return result;
}

export async function unFollowUser(name: string) {
  let user;
  try {
    user = await getUser();
  } catch (error) {
    console.error("Current user is not found", error);
  }

  let otherUser;
  try {
    otherUser = await getUserByUsername(name);
  } catch (error) {
    console.error("User is not found", error);
  }

  if (!user || !otherUser) {
    console.error("User or other user is not found");
    return null;
  }

  const result = await db.follow.delete({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: otherUser.id,
      },
    },
  });
  return result;
}

export async function getFollowedUser() {
  let user;
  try {
    user = await getUser();
  } catch (error) {
    console.error("Current user is not found", error);
  }

  if (!user) {
    console.error("User is not found");
    return null;
  }

  const result = await db.follow.findMany({
    where: {
      followerId: user.id,
    },
    include: {
      following: true,
    },
  });

  return result.map((item) => item.following);
}
