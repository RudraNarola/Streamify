"use client";
import useToken from "@/hooks/useToken";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";

import { useChatSidebar } from "@/store/useChatSidebar";
import { cn } from "@/lib/utils";
import { hostname } from "os";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useToken(user.id);

  const { collapse } = useChatSidebar((state) => state);

  // NOTE: Identity is not coming from the token for some reason
  if (!token || !name) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapse && (
        <div className="hidden lg:block fixed top-[90px] right-2 z-50">
          <ChatToggle />
        </div>
      )}

      {/* LiveKitRoom provides the Context which helps to connect chat to particular stream which is all inside a Room  */}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapse && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-4  lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerName={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
            // isLive={stream.isLive}
            isLive
          />
        </div>
        <div className={cn("col-span-1 2xl:col-span-2", collapse && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnable={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-4 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 2xl:col-span-2 bg-background ">
        <ChatSkeleton />
      </div>
    </div>
  );
};
