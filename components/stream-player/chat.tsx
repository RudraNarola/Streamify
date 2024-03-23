"use client";
import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface StreamPlayerProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnable: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnable,
  isChatDelayed,
  isChatFollowersOnly,
}: StreamPlayerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, Expand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnable || !isOnline;

  const [value, setValue] = useState("");

  // useChat() provided by livekit helps to send and receive messages
  // it uses useContext, by us wrapping this component with LiveKit component
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      Expand();
    }
  }, [matches, Expand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
        <ChatHeader />
        {variant === ChatVariant.CHAT && (
          <>
            <ChatList messages={reversedMessages} isHidden={isHidden} />
            <ChatForm
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
              isHidden={isHidden}
              isFollowersOnly={isChatFollowersOnly}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
            />
          </>
        )}

        {variant === ChatVariant.COMMUNITY && (
          <>
            <ChatCommunity
              viewerName={viewerName}
              hostName={hostName}
              isHidden={isHidden}
            />
          </>
        )}
      </div>
    </>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-2 border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
