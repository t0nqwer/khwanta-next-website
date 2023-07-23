"use client";
import { Tenor_Sans } from "next/font/google";
import useMenuactive from "@Zustand/activeMenu";
import useNavBar from "@Zustand/navbarMenu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SvgComponent from "./Logo";
import { useEffect } from "react";

const Tenor = Tenor_Sans({ subsets: ["latin"], weight: "400" });
const NavBar = ({ lng }) => {
  const router = useRouter();
  const setIsactive = useMenuactive((state) => state.setIsactive);
  const isScrolled = useNavBar((state) => state.isScrolled);
  const setScrolled = useNavBar((state) => state.setScrolled);
  const setColor = useNavBar((state) => state.setColor);
  const color = useNavBar((state) => state.color);
  const isNavShow = useNavBar((state) => state.isNavShow);
  useEffect(() => {
    if (isScrolled) {
      setTimeout(() => document.getElementById("khwantalogotext")?.classList.remove("opacity-0"), 100);
    } else {
      if (isNavShow) {
        document.getElementById("khwantalogotext")?.classList.add("opacity-0");
      }
    }
  }, [isScrolled]);

  return (
    <>
      {isNavShow && (
        <div
          className={`${Tenor.className} fixed z-[300] px-10 max-lg:px-5 max-[425px]:px-2 ${
            isScrolled
              ? "h-[60px] text-primary-500 bg-light-500 bg-opacity-30  backdrop-blur-md"
              : `h-[120px] text-${color ? color : "white"} `
          } flex justify-center w-full items-center   transition-all `}>
          <div
            className={` flex max-[450px]:justify-center justify-between w-4/5 max-[425px]:w-full  h-full ${
              isScrolled ? "border-b-0" : `${color ? "" : ""} border-white`
            }  items-center`}>
            {/* menu */}
            <div
              className="w-52 max-[450px]:absolute  max-[450px]:left-0 max-[450px]:w-fit   parent z-[200] "
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
                id="khwantalogotext"
                className={`max-[425px]:w-fit text-4xl opacity-0 transition-all duration-300 max-[425px]:text-3xl tracking-widest drop-shadow-lg align-middle h-fit w-full text-center  select-none cursor-pointer text-shadow-lg`}
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
