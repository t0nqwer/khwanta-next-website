import { create } from "zustand";

const useNavBar = create((set) => ({
  isNavShow: true,
  isScrolled: true,
  color: "",
  setScrolled: (status) => set((state) => ({ ...state, isScrolled: status })),
  setColor: (color) => set((state) => ({ ...state, color: color })),
  setNavShow: (status) => set((state) => ({ ...state, isNavShow: status })),
}));

export default useNavBar;
