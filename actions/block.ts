"use server";

import { blockUser, unBlockUser } from "@/lib/services/block.services";
import { revalidatePath } from "next/cache";

export async function onBlock(name: string) {
  // TODO : Disconnect from livestream
  // TODO: Alsp kick guest user

  const result = await blockUser(name);

  revalidatePath("/");

  if (result) {
    revalidatePath(`/${result.blocked.username}`);
  }

  return result;
}

export async function onUnblock(name: string) {
  const result = await unBlockUser(name);

  revalidatePath("/");

  if (result) {
    revalidatePath(`/${result.blocked.username}`);
  }

  return result;
}
