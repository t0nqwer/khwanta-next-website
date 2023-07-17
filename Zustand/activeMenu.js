import { create } from "zustand";

const useMenuactive = create((set) => ({
  IsActive: false,
  setIsactive: (value) => {
    set((state) => ({ ...state, IsActive: true }));
  },
  setIsinactive: (value) => set((state) => ({ ...state, IsActive: false })),
}));
export default useMenuactive;
