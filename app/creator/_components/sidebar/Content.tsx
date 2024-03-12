

"use client";
import { Tv, KeySquare, MessageSquareText, UsersRound } from "lucide-react";
import { SidebarNavigationItem, NavItemSkeleton } from "./SidebarNavigation";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Content() {
const pathname = usePathname();
const { user } = useUser();

const routes = [
  {
    label: "Stream",
      href: "/creator/stream",
      icon: Tv ,
  }
  ,
  {
    label: "Keys",
      href: "/creator/keys",
      icon: KeySquare  ,
    
  }
  ,
  {
    label: "Chat",
      href: "/creator/chat",
      icon: MessageSquareText ,
  }
  ,
  {
    label: "Community",
      href: "/creator/community",
      icon: UsersRound ,
      
  }
];

if (!user?.username) {
  return (
    <ul className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <NavItemSkeleton key={i} />
      ))}
    </ul>
  );
}



return (
  <ul className="space-y-2 px-2 pt-4 lg:pt-0">
  {routes.map((route) => (
     <SidebarNavigationItem
       key={route.href}
       label={route.label}
       icon={route.icon}
       href={route.href}
       isActive={pathname === route.href}
       iconSize={30}
       
       
     />
  ))}
  </ul>

)
};









