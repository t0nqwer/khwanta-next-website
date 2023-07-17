"use client";
import useSideBar from "@Zustand/sidebarMenu";
import { adminlinks } from "@utils/side-menu";
import { useEffect } from "react";

const page = () => {
  const setMenu = useSideBar((state) => state.setMenu);

  useEffect(() => {
    setMenu(adminlinks);
  }, []);
  return (
    <div className="w-full h-full">
      {/* <iframe src="http://localhost:3000/" className=""></iframe> */}
    </div>
  );
};

export default page;
