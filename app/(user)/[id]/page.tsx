import { StreamPlayer } from "@/components/stream-player";
import { isBlocked, isBlockedByUser } from "@/lib/services/block.services";
import { isFollowing } from "@/lib/services/follow.services";
import { getUserByUsername } from "@/lib/services/user.services";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.id);

  if (!user || !user.username || !user.stream) {
    notFound();
  }

  // const isFollow = await isFollowing(params.id);
  // const isBlock = await isBlocked(params.id);

  // if (isBlock) {
  //   notFound();
  // }

  const isFollowingResult = await isFollowing(params.id);
  const isBlockedResult = await isBlocked(params.id);

  // checking if the params.id (the user whose profile we are seeing) has blocked us
  const isBlockedByUserResult = await isBlockedByUser(params.id);

  if (isBlockedByUserResult) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowingResult}
      />
    </div>
  );
};

export default Page;
