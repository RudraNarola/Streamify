"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedMark } from "@/app/(user)/_components/verified-mark";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
  isLive: boolean;
}

export const Header = ({
  hostIdentity,
  hostName,
  imageUrl,
  isFollowing,
  name,
  viewerName,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;

  const participantCount = participants.length - 1; // -1 for host

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerName === hostAsViewer;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-3">
          <Link href={`/${hostName}`}>
            <div className={cn("flex items-center gap-x-2 w-full")}>
              {/*  if live then ring should have color red & have live badge */}
              <Avatar
                className={
                  (cn("ring-2 ring-red-400 border-background object-contain"),
                  true ? "ring-green-500" : "ring-gray-600")
                }
              >
                <AvatarImage
                  src={imageUrl}
                  className="object-contain"
                  alt="user img"
                />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </div>
            {isLive ? (
              <div className="bg-green-500 px-0.5 py-0.5 text-sm rounded-sm flex items-start justify-center ">
                Live
              </div>
            ) : null}
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              <h2 className="text-lg font-semibold">{hostName}</h2>
              <VerifiedMark />
            </div>
            <p className="text-sm font-semibold">{name}</p>
            {isLive ? (
              <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                <UserIcon className="h-4 w-4" />
                <p>
                  {participantCount}{" "}
                  {participantCount === 1 ? "viewer" : "viewers"}
                </p>
              </div>
            ) : (
              <p className="font-semibold text-xs text-muted-foreground">
                Offline
              </p>
            )}
          </div>
        </div>
        <Actions
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      </div>
    </>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
