"use server";

import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/services/user.services";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
  const self = await getCurrentUser();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: {
      id: self.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/creator/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
};
