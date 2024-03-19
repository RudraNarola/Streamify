"use server";

import { db } from "@/lib/database";
import { getUserStream } from "@/lib/services/stream.services";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const stream = await getUserStream();

    if (!stream) {
      throw new Error("Stream not found");
    }

    const data = {
      thumbnail: values.thumbnailUrl,
      name: values.name,
      isLive: values.isLive,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const streamUpdated = await db.stream.update({
      where: {
        id: stream.id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/creator/chat");
    revalidatePath(`${stream.userId}`);
    revalidatePath("/creator/dashboard");
  } catch (error) {}
};
