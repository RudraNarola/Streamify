"use server";
import { currentUser } from "@clerk/nextjs";
import { db } from "../database";

export const getCurrentUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("User not authenticated (Clerk)");
  }

  const clerkId = clerkUser.id;

  const user = await db.user.findUnique({
    where: {
      externalId: clerkId,
    },
  });

  if (!user) {
    throw new Error("User no found (Database)");
  }

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// function also exist in follow.services
export const getFollowedChannel = async () => {
  const result = await db.user.findMany();
  return result;
};

export const getRecommendedChannel = async () => {
  const user = await getCurrentUser();
  const result = await db.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: user.id,
          },
        },
        {
          NOT: {
            followedBy: {
              some: {
                followerId: user.id,
              },
            },
          },
        },
        {
          NOT: {
            blocking: {
              some: {
                blockedId: user.id,
              },
            },
          },
        },
      ],
    },
    include: {
      stream: {
        select: {
          isLive: true,
        },
      },
    },
  });
  return result;
};
