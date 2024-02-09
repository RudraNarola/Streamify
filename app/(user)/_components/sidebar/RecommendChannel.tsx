"use client";
import { User } from "@prisma/client";
import UserCard, { UserCardSkeleton, UserItemSkeleton } from "./UserCard";
import { useCollapse } from "@/store/useCollapse";
import { cn } from "@/lib/utils";
interface Props {
  data: User[];
}

const RecommendChannel = ({ data }: Props) => {
  const { collapse } = useCollapse();

  return (
    <div className={cn(collapse ? "mt-1" : "mt-1 lg:mt-6")}>
      {!collapse && (
        <div className="text-sm font-semibold mb-2 max-lg:hidden">
          RECOMMENDED CHANNELS
        </div>
      )}
      <div className="w-full flex gap-y-1 flex-col">
        {data.map((user) => {
          return (
            <UserCard
              key={user.id}
              imageUrl={user.imageUrl}
              username={user.username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendChannel;


export const RecommendedSkeleton = ()=>{
  return(
    <ul className="px-2">
      {
        [...Array(5)].map((_,i)=>(
          <UserItemSkeleton key={i}/>
        ))


      }
    </ul>

  )
}
