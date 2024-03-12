import { db } from "../database";
import { getUser } from "./user.services";

export async function getUserStream() {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userStream = await db.stream.findUnique({
    where: {
      userId: user.id,
    },
  });


  if (!userStream) {
    throw new Error("User stream not found");
  }

  return userStream;
}
