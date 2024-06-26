import { db } from "../database";
import {
  getCurrentUser,
  getUserById,
  getUserByUsername,
} from "./user.services";

export async function isBlocked(name: string) {
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
    return null;
  }

  if (user.id === otherUser.id) {
    console.error("User and other user are the same");
    return false;
  }

  const result = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id,
      },
    },
  });

  return !!result;
}

export async function isBlockedByUser(name: string) {
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
    return null;
  }

  if (user.id === otherUser.id) {
    console.error("User and other user are the same");
    return false;
  }

  const result = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: otherUser.id,
        blockedId: user.id,
      },
    },
  });

  return !!result;
}

export async function blockUser(id: string) {
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
    console.error("User or other user is not found in blocking");
    return null;
  }

  if (user.id === otherUser.id) {
    console.error("User and other user are the same");
    return null;
  }

  const res = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (res) {
    console.log("Already blocked!!!");
    return null;
  }

  const result = await db.block.create({
    data: {
      blockerId: user.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
      blocker: true,
    },
  });

  console.log("Blocked successfully");
  return result;
}

export async function unBlockUser(id: string) {
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

  const res = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!res) {
    console.log("Already Not blocked");
    return null;
  }

  const result = await db.block.delete({
    where: {
      id: res.id,
    },
    include: {
      blocked: true,
    },
  });

  console.log("Unblock successfully");
  return result;
}

export const getBlockedUsers = async () => {
  const user = await getCurrentUser();
  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: user.id,
    },
    include: {
      blocked: true,
    },
  });
  return blockedUsers;
};
