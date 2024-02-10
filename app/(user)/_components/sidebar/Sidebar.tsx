import FollowedChannel from "./FollowedChannel";
import RecommendChannel from "./RecommendChannel";
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
