import { SignInButton, currentUser, UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";



const Action = async () => {
  const user = await currentUser();

  return (
    <div className="flex gap-8 mr-4">
      {user && (
        <div className="flex items-center gap-2 cursor-pointer">
          <LayoutDashboard className="text-muted-foreground" />
          <p className="hidden lg:block font-semibold">Dashboard</p>
        </div>
      )}
      {!user && (
        <SignInButton>
          <Button variant="primary">Sign In</Button>
        </SignInButton>
      )}
      <Suspense fallback={<UserButtonSkeleton />}>

       <UserButton afterSignOutUrl="/" /> 
      </Suspense>
    </div>
  );
};

export default Action;


export const UserButtonSkeleton = ()=>{
  return(
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className ="min-h-[32px] min-w-[32px] rounded-full"/>

      </li>
  );
};