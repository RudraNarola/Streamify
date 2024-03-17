import { StreamPlayer } from "@/components/stream-player";
import {
  getUserByExternalId,
  getUserById,
  getUserByUsername,
} from "@/lib/services/user.services";
import { currentUser } from "@clerk/nextjs";

export const Dashboard = async () => {
  const externalUser = await currentUser();
  // const user = await getUserByUsername(params.username);

  if (!externalUser) {
    throw new Error("User not found or unauthorized");
  }

  const user = await getUserByExternalId(externalUser?.id); // on DashBoard only owner can see the stream

  if (!user || !user.stream || user.id !== externalUser.id) {
    throw new Error("User not found or unauthorized");
  }

  return (
    <>
      <div className="h-full">
        <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
      </div>
    </>
  );
};

export default Dashboard;
