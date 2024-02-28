import FollowedChannel, { FollowedChannelSkeleton } from "./FollowedChannel";
import RecommendChannel, { RecommendedSkeleton } from "./RecommendChannel";
import Header from "./Header";
import Wrapper from "./Wrapper";
import { getFollowed, getRecommended } from "@/lib/services/user.services";
import { getFollowedUser } from "@/lib/services/follow.services";

const Sidebar = async () => {
  // query for data here only then pass to FollowChannel & RecommendChannel
  const followedData = await getFollowedUser();
  const recommendedData = await getRecommended();

  return (
    <>
      {/* we wrap the Sidebar because so the Wrapper can be client component to use hooks while children can still be server component ro fetch data on server*/}
      <Wrapper>
        <Header />
        <FollowedChannel data={followedData} />
        <RecommendChannel data={recommendedData} />
      </Wrapper>
    </>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <RecommendedSkeleton />
      <FollowedChannelSkeleton />
    </aside>
  );
};
