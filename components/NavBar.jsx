"use client";
import { Tenor_Sans } from "next/font/google";
import useMenuactive from "@Zustand/activeMenu";
import useNavBar from "@Zustand/navbarMenu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SvgComponent from "./Logo";

const Tenor = Tenor_Sans({ subsets: ["latin"], weight: "400" });
const NavBar = ({ lng }) => {
  const router = useRouter();
  const setIsactive = useMenuactive((state) => state.setIsactive);
  const isScrolled = useNavBar((state) => state.isScrolled);
  const setScrolled = useNavBar((state) => state.setScrolled);
  const setColor = useNavBar((state) => state.setColor);
  const color = useNavBar((state) => state.color);
  const isNavShow = useNavBar((state) => state.isNavShow);

  return (
    <>
      {isNavShow && (
        <div
          className={`${Tenor.className} fixed z-40 px-10 max-lg:px-5 ${
            isScrolled
              ? "h-[60px] text-primary-500 bg-white bg-opacity-30  backdrop-blur-md"
              : `h-[120px] text-${color ? color : "white"} `
          } flex justify-center w-full items-center   transition-all `}>
          <div
            className={` flex justify-between w-4/5  h-full ${
              isScrolled ? "border-b-0" : `${color ? "" : ""} border-white`
            }  items-center`}>
            {/* menu */}
            <div
              className="w-52 max-md:hidden parent z-[200] "
              onClick={() => {
                setIsactive();
                setScrolled(true);
              }}>
              <div
                className={`the_header_menu ${
                  isScrolled
                    ? " before:bg-primary-400 after:bg-primary-400"
                    : `before:bg-${color ? color : "white"} after:bg-${color ? color : "white"}`
                }  z-[200] `}></div>
            </div>
            {/* logo */}
            {isScrolled ? (
              <a
                className={` text-4xl tracking-widest drop-shadow-md align-middle h-fit w-full text-center select-none cursor-pointer`}
                onClick={() => router.push("/")}>
                KHWANTA
              </a>
            ) : (
              <div className="cursor-pointer ">
                <SvgComponent
                  fill={color ? "#a1000e" : "white"}
                  width={176}
                  height={64}
                  onClick={() => router.push("/")}
                />
              </div>
            )}
            {/* Catalog */}
            <button
              className={`header_catalog_text link ${
                isScrolled ? "before:bg-primary-500" : `before:bg-${color ? color : "white"} `
              } max-md:hidden w-52 text-base`}
              onClick={() => {
                router.push(`/${lng}/catalog`);
                setScrolled(true);
              }}>
              <div className=" fourdot__container">
                <div
                  className={` fourdot  ${
                    isScrolled
                      ? "after:bg-primary-500 before:bg-primary-500"
                      : `${color ? `after:bg-${color} before:bg-${color}` : "after:bg-white before:bg-white"}`
                  }`}
                  style={{
                    content: {
                      backgroundColor: "#a1000e",
                    },
                  }}></div>
                <div
                  className={` fourdot 0 ${
                    isScrolled
                      ? "after:bg-primary-500 before:bg-primary-500"
                      : `after:bg-${color ? color : "white"} before:bg-${color ? color : "white"} `
                  } `}></div>
              </div>
              <strong className="relative ">Catalog</strong>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
