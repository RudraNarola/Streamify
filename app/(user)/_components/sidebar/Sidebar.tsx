import FollowedChannel from "./FollowedChannel";
import RecommendChannel from "./RecommendChannel";
import Header from "./Header";
import Wrapper from "./Wrapper";

const Sidebar = () => {
  return (
    <>
      {/* we wrap the Sidebar because so the Wrapper can be client component to use hooks while children can still be server component ro fetch data on server*/}
      <Wrapper>
        <Header />
        <FollowedChannel />
        <RecommendChannel />
      </Wrapper>
    </>
  );
};

export default Sidebar;
