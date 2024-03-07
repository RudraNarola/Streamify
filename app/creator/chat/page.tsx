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
      <div className="flex w-full flex-col gap-6">
        <h2 className="text-2xl mt-8 ml-8 font-bold">Chat Settings</h2>
        <div className="bg-muted p-10 mx-auto flex flex-col gap-4 rounded-md">
          <ToggleItems label="Live" checked={stream.isLive} />
          <ToggleItems label="Chat Enable" checked={stream.isChatEnabled} />
          <ToggleItems label="Chat Delay" checked={stream.isChatDelayed} />
          <ToggleItems
            label="Chat Follower Only"
            checked={stream.isChatFollowersOnly}
          />
        </div>
      </div>
    </>
  );
};

export default page;
