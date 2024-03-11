import { Button } from "@/components/ui/button";
import React from "react";
import KeyCard from "./_components/KeyCard";
import UrlCard from "./_components/UrlCard";
import { getUserStream } from "@/lib/services/stream.services";
import ConnectModal from "./_components/ConnectModal";

const page = async () => {
  const stream = await getUserStream();

  if (!stream) {
    return <div>Stream not Found</div>;
  }

  return (
    <>
      <div className="w-full p-6">
        <div className="flex justify-between mb-4 px-2 w-full">
          <h1 className="text-2xl font-bold">Keys & Urls Setting</h1>
          <ConnectModal />
        </div>
        <div className="space-y-4 px-14 py-4">
          <UrlCard value={stream.serverUrl} />
          <KeyCard value={stream.streamKey} />
        </div>
      </div>
    </>
  );
};

export default page;
