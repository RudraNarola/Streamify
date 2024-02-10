import { SignInButton, currentUser, UserButton } from "@clerk/nextjs";

import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Action = async () => {
  const user = await currentUser();
  return (
    <div className={cn(!!user && "flex gap-8 mr-4")}>
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

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Action;
