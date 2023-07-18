import { create } from "zustand";

const useNavBar = create((set) => ({
  isScrolled: true,
  color: "",
  setScrolled: (status) => set((state) => ({ ...state, isScrolled: status })),
  setColor: (color) => set((state) => ({ ...state, color: color })),
}));

export default useNavBar;
