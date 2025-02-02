import { create } from 'zustand';

type State = {
  isLeftSidebarOpen: boolean;
  isRightSidebarOpen: boolean;
}

type Actions = {
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setLeftSidebar: (isOpen: boolean) => void;
  setRightSidebar: (isOpen: boolean) => void;
}

export const useSidebarStore = create<State & Actions>((set) => ({
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
  toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
  setLeftSidebar: (isOpen) => set({ isLeftSidebarOpen: isOpen }),
  setRightSidebar: (isOpen) => set({ isRightSidebarOpen: isOpen }),
})); 