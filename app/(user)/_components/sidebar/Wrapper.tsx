"use client";
import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { collapse, Expand, Collapse } = useCollapse();

  return (
    <div
      className={cn(
        "w-[60px] h-full bg-[#1b1d24] p-2",
        collapse === false ? "lg:w-52" : "",
        "transition transform duration-300 ease-in-out overflow-y-auto scrollbar-hide"
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
