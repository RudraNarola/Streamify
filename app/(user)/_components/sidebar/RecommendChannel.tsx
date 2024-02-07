import { cn } from "@/lib/utils";
import { useCollapse } from "@/store/useCollapse";

const RecommendChannel = () => {
  const { collapse } = useCollapse();

  return (
    <div
      className={cn("text-sm font-semibold", collapse === true ? "hidden" : "")}
    >
      RECOMMENDED
    </div>
  );
};

export default RecommendChannel;
