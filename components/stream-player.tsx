import useToken from "@/hooks/useToken";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useToken(user.id);

  if (!token || !name || !identity) {
    return (
      <>
        <div>Cannot watch the stream</div>
      </>
    );
  }

  return (
    <>
      <div>Hello Stream Player</div>
    </>
  );
};
