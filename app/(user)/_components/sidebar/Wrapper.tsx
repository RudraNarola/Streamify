"use client";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapse, Expand, Collapse } = useCollapse();

  return (
    <aside
      className={cn(
        "w-[60px] h-full bg-[#222222] p-2",
        collapse === false ? "lg:w-60" : "",
        "transition transform duration-300 ease-in-out overflow-y-auto scrollbar-hide"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
