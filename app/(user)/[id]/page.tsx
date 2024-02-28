import { isFollowing } from "@/lib/services/follow.services";
import ButtonAction from "./_components/ButtonAction";
import { isBlocked } from "@/lib/services/block.services";

const Page = async ({ params }: { params: { id: string } }) => {
  const isFollowingResult = await isFollowing(params.id);
  const isBlockedResult = await isBlocked(params.id);

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
