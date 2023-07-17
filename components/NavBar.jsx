"use client";
import { Tenor_Sans } from "next/font/google";
import useMenuactive from "@Zustand/activeMenu";
import useNavBar from "@Zustand/navbarMenu";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Tenor = Tenor_Sans({ subsets: ["latin"], weight: "400" });
const NavBar = ({ lng }) => {
  const router = useRouter();
  const setIsactive = useMenuactive((state) => state.setIsactive);
  const isScrolled = useNavBar((state) => state.isScrolled);
  const setScrolled = useNavBar((state) => state.setScrolled);
  return (
    <div
      className={`${Tenor.className} fixed z-50 px-10 max-lg:px-5 ${
        isScrolled ? "h-[60px] text-primary-500 bg-white bg-opacity-30  backdrop-blur-md" : "h-[120px] text-white "
      } flex justify-center w-full items-center   transition-all `}>
      <div
        className={` flex justify-between w-4/5  h-full ${
          isScrolled ? "border-b-0" : "border-b-2 border-white"
        }  items-center`}>
        {/* menu */}
        <div className="w-52 max-md:hidden parent " onClick={setIsactive}>
          <div
            className={`the_header_menu ${
              isScrolled ? " before:bg-primary-500 after:bg-primary-500" : "before:bg-white after:bg-white"
            }`}></div>
        </div>
        {/* logo */}
        {isScrolled ? (
          <a
            className={` text-4xl tracking-widest drop-shadow-md align-middle h-fit w-full text-center select-none`}
            onClick={() => router.push("/")}>
            KHWANTA
          </a>
        ) : (
          <Image src="/logo-s-white.png" className="" width={176} height={64} onClick={() => router.push("/")} />
        )}
        {/* Catalog */}
        <button
          className={`header_catalog_text ${isScrolled ? "link" : "linkwhite"} max-md:hidden w-52 text-base`}
          onClick={() => {
            router.push(`/${lng}/catalog`);
            setScrolled(true);
          }}>
          <div className=" fourdot__container">
            <div
              className={` fourdot after:bg-primary-500 ${
                isScrolled ? "after:bg-primary-500 before:bg-primary-500" : "after:bg-white before:bg-white "
              } `}></div>
            <div
              className={` fourdot after:bg-primary-500 ${
                isScrolled ? "after:bg-primary-500 before:bg-primary-500" : "after:bg-white before:bg-white "
              } `}></div>
          </div>
          <strong className="relative ">Catalog</strong>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
