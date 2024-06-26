import FollowedChannel, { FollowedChannelSkeleton } from "./FollowedChannel";
import RecommendChannel, { RecommendedSkeleton } from "./RecommendChannel";
import { Header, HeaderSkeleton } from "./Header";
import Wrapper from "./Wrapper";
import {
  getFollowedChannel,
  getRecommendedChannel,
} from "@/lib/services/user.services";
import { getFollowedUser } from "@/lib/services/follow.services";

const Sidebar = async () => {
  // query for data here only then pass to FollowChannel & RecommendChannel
  const followedData = await getFollowedUser();
  const recommendedData = await getRecommendedChannel();

  return (
    <>
      {/* we wrap the Sidebar because so the Wrapper can be client component to use hooks while children can still be server component ro fetch data on server*/}
      <Wrapper>
        <Header />
        <div className="space-y-4 pt-4 lg:pt-0">
          <FollowedChannel data={followedData} />
          <RecommendChannel data={recommendedData} />
        </div>
      </Wrapper>
    </>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <HeaderSkeleton />
      <RecommendedSkeleton />
      <FollowedChannelSkeleton />
    </aside>
  );
};
