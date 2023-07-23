"use client";
import { useEffect, useState } from "react";
import SvgComponent from "@components/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaLine, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { BiLogoFacebookSquare } from "react-icons/bi";
import Link from "next/link";

const FooterHome = ({ lng }) => {
  const router = useRouter();
  const [about, setAbout] = useState();
  const fetchData = async () => {
    const response = await fetch("/api/contact");
    const data = await response.json();

    setAbout(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-full pt-10 bg-light-400">
      <div className="grid grid-cols-2 px-20 text-2xl text-center font-primary">
        <div className="w-full tracking-wider">
          <h1 className="px-16 py-5 text-4xl ">เมนู</h1>
          <p className="cursor-pointer hover:underline" onClick={() => router.push(`${lng}/catalog`)}>
            แคตตาล็อกสินค้า
          </p>
          <p className="cursor-pointer hover:underline" onClick={() => router.push(`${lng}/history`)}>
            เรื่องราวแบรนด์ขวัญตา
          </p>
          <p className="cursor-pointer hover:underline" onClick={() => router.push(`${lng}/policy`)}>
            นโยบายจัดส่งสินค้า/การคืนเงิน/และการเปลี่ยนคืนหรือยกเลิกสินค้า
          </p>
        </div>
        <div className="w-full ">
          <h1 className="px-16 py-5 text-4xl text-left">ช่องทางการติดต่อ</h1>
          <div className="">
            {about && (
              <>
                <div className="flex space-x-6">
                  <h1 className="w-20 text-right">สถานที่ :</h1>
                  <h1 className="">{about.address}</h1>
                </div>
                <div className="flex space-x-6">
                  <h1 className="w-20 text-right">โทรศัพท์ :</h1>
                  <h1 className="">{about.tel}</h1>
                </div>
                <div className="flex space-x-6">
                  <h1 className="w-20 text-right">อีเมล์ :</h1>
                  <h1 className="">{about.email}</h1>
                </div>
              </>
            )}
          </div>
          <div className="flex px-20 mt-5 space-x-10 text-5xl text-primary-500 ">
            <FaLine className=" hover:cursor-pointer" onClick={() => window.open("https://lin.ee/M3rLQI1", "_blank")} />

            <FaFacebookSquare
              className=" hover:cursor-pointer"
              onClick={() => window.open(`${about.facebook}`, "_blank")}
            />
            <FaInstagramSquare
              className=" hover:cursor-pointer"
              onClick={() => window.open(`${about.instagram}`, "_blank")}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center cursor-pointer ">
        <SvgComponent fill={"#a1000e"} width={800} height={250} onClick={() => router.push("/")} />
      </div>
      <div className="pb-3 text-center">© 2022 KHWANTA LIMITED PARTNERSHIP All rights reserved </div>
    </div>
  );
};

export default FooterHome;
