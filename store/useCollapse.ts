import { create } from "zustand";

type UseCollapseState = {
  collapse: boolean;
  Expand: () => void;
  Collapse: () => void;
};

export const useCollapse = create<UseCollapseState>((set) => ({
  collapse: false,
  Expand: () => set({ collapse: false }),
  Collapse: () => set({ collapse: true }),
}));
