"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useSideBar from "@Zustand/sidebarMenu";

import toast from "react-hot-toast";
import useIsLoading from "@Zustand/isLoading";
const page = () => {
  const router = useRouter();
  const [about, setAbout] = useState({
    address: "",
    email: "",
    facebook: "",
    instagram: "",
    tel: "",
  });
  const Address = useRef("");
  const Tel = useRef("");
  const Email = useRef("");
  const Facebook = useRef("");
  const Instagram = useRef("");
  const setMenu = useSideBar((state) => state.setMenu);
  const innitialmenu = useSideBar((state) => state.innitialmenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);
  const inputcss = "w-full bg-primary-400 p-5 rounded-md text-light-500 outline-none text-lg font-semibold";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("/api/contact");
      const data = await response.json();
      console.log(data);
      setAbout(data);
      setIsLoading(false);
    };
    fetchData();
    setMenu(innitialmenu);
  }, []);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: Address.current.value,
        tel: Tel.current.value,
        email: Email.current.value,
        facebook: Facebook.current.value,
        instagram: Instagram.current.value,
      }),
    });
    if (response.ok) {
      console.log("ok");
      setIsLoading(false);
      router.push("/kt-admin");
      toast.success("แก้ไขข้อมูลเรียบร้อย");
    } else {
      toast.error("ไม่สามารถแก้ไขข้อมูลได้");
    }
  };
  return (
    <div className="p-10 select-none bg-primary-500 ">
      <h1 className=" font-primary text-8xl text-light-400 w-full text-center tracking-widest border-b-[1px] pb-5">
        ช่องทางการติดต่อ
      </h1>
      <div className="border-b-[1px] pt-5 pb-6 w-full">
        <h1 className="text-3xl tracking-widest font-secondary text-light-400">Address</h1>
        <input className={`${inputcss}`} ref={Address} placeholder={about?.address} />
      </div>
      <div className="border-b-[1px] pt-5 pb-6 w-full">
        <h1 className="text-3xl tracking-widest font-secondary text-light-400">Tel</h1>
        <input className={`${inputcss}`} ref={Tel} placeholder={about?.tel} />
      </div>
      <div className="border-b-[1px] pt-5 pb-6 w-full">
        <h1 className="text-3xl tracking-widest font-secondary text-light-400">Email</h1>
        <input className={`${inputcss}`} ref={Email} placeholder={about?.email} />
      </div>
      <div className="border-b-[1px] pt-5 pb-6 w-full">
        <h1 className="text-3xl tracking-widest font-secondary text-light-400">Facebook</h1>
        <input className={`${inputcss}`} ref={Facebook} placeholder={about?.facebook} />
      </div>
      <div className="border-b-[1px] pt-5 pb-6 w-full">
        <h1 className="text-3xl tracking-widest font-secondary text-light-400">Instragram</h1>
        <input className={`${inputcss}`} ref={Instagram} placeholder={about?.instagram} />
      </div>
      <div className="flex justify-end w-full mt-5">
        <button
          className="p-5 text-2xl font-semibold transition-colors duration-150 font-secondary text-brand-600 bg-light-500 hover:bg-primary-600 hover:text-light-500 "
          onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default page;
