"use server";

import { blockUser, unBlockUser } from "@/lib/services/block.services";
import { getCurrentUser } from "@/lib/services/user.services";
import { RoomServiceClient } from "livekit-server-sdk";

import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function onBlock(name: string) {
  const user = await getCurrentUser();

  let blockedUser;
  try {
    blockedUser = await blockUser(name);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(user.id, name);
  } catch {
    // This means user is a guest
  }

  revalidatePath(`/${blockedUser?.blocked.username}`);

  return blockedUser;
}

export async function onUnblock(name: string) {
  const user = await getCurrentUser();

  const result = await unBlockUser(name);

  revalidatePath(`/creator/${user?.username}/community`);

  // if (result) {
  //   revalidatePath(`/${result.blocked.username}`);
  // }

  return result;
}
