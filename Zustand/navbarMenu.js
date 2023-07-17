import { create } from "zustand";

const useNavBar = create((set) => ({
  isScrolled: true,
  setScrolled: (status) => set((state) => ({ ...state, isScrolled: status })),
}));

export default useNavBar;
