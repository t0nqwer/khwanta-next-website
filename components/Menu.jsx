import Image from "next/image";
import { links } from "@utils/side-menu";
import Link from "next/link";
import { Tenor_Sans } from "next/font/google";
import useMenuactive from "@Zustand/activeMenu";

const Tenor = Tenor_Sans({ subsets: ["latin"], weight: "400" });
const Menu = ({ lng }) => {
  const setIsinactive = useMenuactive((state) => state.setIsinactive);
  const closeMenu = () => {
    const element = document.getElementById("menu");
    element.classList.remove("animate-slidedown");
    element.classList.add("animate-slideout");
    setTimeout(setIsinactive, 390);
  };
  return (
    <div
      id="menu"
      className={`${Tenor.className} w-full h-screen fixed flex  z-[400] bg-primary-700 animate-slidedown`}>
      <div className="absolute w-full z-100  h-[60px] px-10 max-md:px-2 max-sm:px-0 flex justify-center  items-center   transition-all">
        <div className="relative w-4/5 h-full max-md:w-full">
          <div className="close_button " onClick={closeMenu} />
        </div>
      </div>
      <div className="relative z-40 flex flex-col items-center justify-center w-2/5 max-md:w-1/2 max-sm:w-full">
        {/* <div className="close_button " onClick={closeMenu}></div> */}
        {links.map((link, index) => (
          <Link
            key={link.pathname}
            href={`/${lng}/${link.pathname}`}
            className={`w-full text-4xl py-5 text-center text-light-500 border-primary-700  ${
              index === 0 ? "border-t-2 border-b-2" : ""
            }${index !== 0 ? "border-b-2" : ""}`}
            onClick={closeMenu}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="w-3/5 max-md:w-1/2 max-sm:w-0">
        <Image
          src="/2142019_190422_0209 - Copy.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Menu;
