import { create } from "zustand";

const useIsLoading = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) =>
    set((state) => ({ ...state, isLoading: isLoading })),
}));

export default useIsLoading;
