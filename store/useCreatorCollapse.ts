import { create } from "zustand";

type useCreatorCollapseState = {
  collapse: boolean;
  Expand: () => void;
  Collapse: () => void;
};

export const useCreatorCollapse = create<useCreatorCollapseState>((set) => ({
  collapse: false,
  Expand: () => set({ collapse: false }),
  Collapse: () => set({ collapse: true }),
}));
