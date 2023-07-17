import { create } from "zustand";

const useSideBar = create((set) => ({
  innitialmenu: [
    {
      title: "Back",
      pathname: "/kt-admin",
    },
  ],
  menu: [],
  setMenu: (menu) => set((state) => ({ ...state, menu: menu })),
}));

export default useSideBar;
