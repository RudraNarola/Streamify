"use server";
import { currentUser } from "@clerk/nextjs";
import { db } from "../database";

export const getUser = async () => {
 
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

export const getFollowed = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await db.user.findMany();
  return result;
};

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await db.user.findMany();
  return result;
};
