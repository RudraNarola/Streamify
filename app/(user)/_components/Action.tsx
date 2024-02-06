import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

const Action = () => {
  return (
    <div className="flex gap-8 mr-4">
      <div className="flex items-center gap-2 cursor-pointer">
        <LayoutDashboard className="text-muted-foreground" />
        <p className="hidden lg:block font-semibold">Dashboard</p>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Action;
