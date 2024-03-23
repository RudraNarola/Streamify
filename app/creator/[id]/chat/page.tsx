import { getUserStream } from "@/lib/services/stream.services";
import ToggleItems from "./_components/ToggleItems";
import { notFound } from "next/navigation";
import { Stream } from "stream";

const page = async () => {
  let stream;
  try {
    stream = await getUserStream();
  } catch (error) {
    return notFound();
  }

  return (
    <>
      <div className="w-full p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Chat Settings</h1>
        </div>
        <div className="space-y-4 px-14 py-4">
          {/* <ToggleItems field="isLive" label="Live" checked={stream.isLive} /> */}
          <ToggleItems
            field="isChatEnabled"
            label="Enable Chat"
            checked={stream.isChatEnabled}
          />
          <ToggleItems
            field="isChatDelayed"
            label="Chat Delay"
            checked={stream.isChatDelayed}
          />
          <ToggleItems
            field="isChatFollowersOnly"
            label="Chat Follower Only"
            checked={stream.isChatFollowersOnly}
          />
        </div>
      </div>
    </>
  );
};

export default page;
