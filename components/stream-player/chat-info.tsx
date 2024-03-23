import { useMemo } from "react";
import { Info } from "lucide-react";

interface Props {
  isFollowersOnly: boolean;
  isDelayed: boolean;
}

export const ChatInfo = ({ isFollowersOnly, isDelayed }: Props) => {
  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only Chat";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Slow Mode Enabled";
    }
    if (isDelayed && isFollowersOnly) {
      return "Only Followers Can Chat. Slow Mode Enabled";
    }
  }, [isFollowersOnly, isDelayed]);

  if (!label) return null;

  return (
    <>
      <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2 ">
        <Info className="w-4 h-4" />
        <p className="text-xs font-semibold">{label}</p>
      </div>
    </>
  );
};
