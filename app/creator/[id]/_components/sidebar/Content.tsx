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
      href: `/creator/${user?.username}`,
      icon: Tv,
    },
    {
      label: "Keys",
      href: `/creator/${user?.username}/keys`,
      icon: KeySquare,
    },
    {
      label: "Chat",
      href: `/creator/${user?.username}/chat`,
      icon: MessageSquareText,
    },
    {
      label: "Community",
      href: `/creator/${user?.username}/community`,
      icon: UsersRound,
    },
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
    <ul className=" w-full flex gap-y-3 flex-col pt-4">
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
  );
}
