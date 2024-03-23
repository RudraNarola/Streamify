"use server";

import { db } from "@/lib/database";
import { getUserStream } from "@/lib/services/stream.services";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const selfStream = await getUserStream();

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const data = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isLive: values.isLive,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const streamUpdated = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath(`/creator/${selfStream.userId}/chat`);
    revalidatePath(`/creator/${selfStream.userId}`);
    revalidatePath(`/${selfStream.userId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};
