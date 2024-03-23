"use server";

import { followUser, unFollowUser } from "@/lib/services/follow.services";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    console.log("hello on actions");
    const result = await followUser(id);

    revalidatePath("/"); // Maybe we should revalidate the user page instead

    if (result) {
      revalidatePath(`/${result.following.username}`);
    }

    return result;
  } catch (error) {}
};

export const onUnfollow = async (id: string) => {
  try {
    const result = await unFollowUser(id);

    revalidatePath("/"); // Maybe we should revalidate the user page instead

    if (result) {
      revalidatePath(`/${result.following.username}`);
    }

    return result;
  } catch (error) {}
};
