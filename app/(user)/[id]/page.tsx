import { isFollowing } from "@/lib/services/follow.services";
import ButtonAction from "./_components/ButtonAction";
import { isBlocked, isBlockedByUser } from "@/lib/services/block.services";
import { notFound } from "next/navigation";
import { StreamPlayer } from "@/components/stream-player";

const Page = async ({ params }: { params: { id: string } }) => {
  const isFollowingResult = await isFollowing(params.id);
  const isBlockedResult = await isBlocked(params.id);

  // checking if the params.id (the user whose profile we are seeing) has blocked us
  const isBlockedByUserResult = await isBlockedByUser(params.id);

  if (isBlockedByUserResult) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-4 ml-10 mt-4">
        <div>User: {params.id}</div>
        <div>isFollowing: {isFollowingResult ? "true" : "false"}</div>
        <div>isBlocked: {isBlockedResult ? "true" : "false"}</div>

        <ButtonAction
          isFollowing={!!isFollowingResult}
          userId={params.id}
          isBlocked={!!isBlockedResult}
        />
      </div>
    </>
  );
};

export default Page;
