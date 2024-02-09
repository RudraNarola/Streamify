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

  console.log(user);

  return user;
};

export const getFollowed = async () => {
  const result = await db.user.findMany();
  return result;
};

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const result = await db.user.findMany();
  return result;
};
