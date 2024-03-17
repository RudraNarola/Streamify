"use server";

import { isBlockedByUser } from "@/lib/services/block.services";
import { getCurrentUser, getUserById } from "@/lib/services/user.services";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export const createViewerToken = async (hostId: string) => {
  let user;

  try {
    user = await getCurrentUser();
  } catch {
    const id = v4();
    const username = `guest-${id}`;
    user = { id, username };
  }

  const host = await getUserById(hostId);

  if (!host) {
    throw new Error("Host not found");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("You are blocked by the host");
  }

  const isHost = user.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${user.id}` : user.id,
      name: user.username,
    }
  );

  token.addGrant({
    roomJoin: true,
    room: hostId,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
