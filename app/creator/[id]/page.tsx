import { StreamPlayer } from "@/components/stream-player/index";
import { getUserByUsername } from "@/lib/services/user.services";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
  params: {
    id: string;
  };
}

export const Dashboard = async ({ params }: CreatorPageProps) => {
  console.log("id", params.id);

  const externalUser = await currentUser();
  const user = await getUserByUsername(params.id);

  if (
    !user ||
    !externalUser ||
    !user.stream ||
    user.externalId !== externalUser?.id
  ) {
    throw new Error("User not found or unauthorized");
  }

  return (
    <>
      <div className="h-full w-full">
        <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
      </div>
    </>
  );
};

export default Dashboard;
