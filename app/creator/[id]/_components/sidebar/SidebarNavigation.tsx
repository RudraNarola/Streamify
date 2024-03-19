"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatorCollapse } from "@/store/useCreatorCollapse";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  iconSize?: number;
}

export const SidebarNavigationItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  iconSize = 30,
}: NavItemProps) => {
  const { collapse } = useCreatorCollapse((state) => state);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12 max-lg:p-0",
        collapse ? "justify-center  p-0" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center gap-x-2 w-full max-lg:justify-center",
            collapse && "justify-center"
          )}
        >
          <Icon
            className={
              cn()
              // "h-6 w-6"
              //  collapse ? "mr-0" : "mr-2"
            }
            // size={iconSize}
          />
          {!collapse && <p className="max-lg:hidden">{label}</p>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex  items-center gap-x-4 md:px-3 px-1 py-2 ">
      <Skeleton className="min-h-[40px] min-w-[40px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
