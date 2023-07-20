"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useSideBar from "@Zustand/sidebarMenu";
import toast from "react-hot-toast";
import useIsLoading from "@Zustand/isLoading";
import SelectRecommend from "@components/kt-admin/SelectRecommend";
const links = [
  {
    title: "Back",
    pathname: "/kt-admin",
  },
  {
    title: "สินค้าแนะนำ",
    pathname: "/kt-admin/heropage/recommend",
  },
  {
    title: "เพิ่มสินค้า",
    pathname: "/kt-admin/products/import?page=1",
  },
];
const page = () => {
  const router = useRouter();
  const setMenu = useSideBar((state) => state.setMenu);
  const innitialmenu = useSideBar((state) => state.innitialmenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);

  useEffect(() => {
    setMenu(links);
  }, []);
  return <div></div>;
};

export default page;
