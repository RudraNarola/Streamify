import { db } from "../database";
import {
  getCurrentUser,
  getUserById,
  getUserByUsername,
} from "./user.services";

export async function isFollowing(name: string) {
  let user;
  try {
    user = await getCurrentUser();
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
    return false;
  }

  if (user.id === otherUser.id) {
    console.error("User and other user are the same");
    return true;
  }

  const result = await db.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  });

  return !!result;
}

export async function followUser(id: string) {
  let user;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Current user is not found", error);
  }

  let otherUser;
  try {
    otherUser = await getUserById(id);
  } catch (error) {
    console.error("User is not found", error);
  }

  if (!user || !otherUser) {
    console.error("User or other user is not found");
    return null;
  }

  if (user.id === otherUser.id) {
    console.error("User and other user are the same");
    return null;
  }

  const res = await db.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  });

  if (res) {
    console.log("Already following");
    return null;
  }

  const result = await db.follow.create({
    data: {
      followerId: user.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  console.log("Followed successfully");
  return result;
}

export async function unFollowUser(id: string) {
  let user;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Current user is not found", error);
  }

  let otherUser;
  try {
    otherUser = await getUserById(id);
  } catch (error) {
    console.error("User is not found", error);
  }

  if (!user || !otherUser) {
    console.error("User or other user is not found");
    return null;
  }

  if (user.id === otherUser.id) {
    console.error("User and other user are the same");
    return null;
  }

  const res = await db.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  });

  if (!res) {
    console.log("Already Not following");
    return null;
  }

  const result = await db.follow.delete({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: otherUser.id,
      },
    },
    include: {
      following: true,
      follower: true,
    },
  });

  console.log("Unfollowed successfully");
  return result;
}

export async function getFollowedUser() {
  let user;
  try {
    user = await getCurrentUser();
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
      following: {
        blocking: {
          none: {
            blockedId: user.id,
          },
        },
      },
    },
    include: {
      following: true,
    },
  });

  return result.map((item) => item.following);
}
