import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface useChatSidebarStore {
  collapse: boolean;
  variant: ChatVariant;
  Expand: () => void;
  Collapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<useChatSidebarStore>((set) => ({
  collapse: false,
  variant: ChatVariant.CHAT,
  Expand: () => set({ collapse: false }),
  Collapse: () => set({ collapse: true }),
  onChangeVariant: (variant: ChatVariant) => set({ variant }),
}));
