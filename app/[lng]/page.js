"use client";
import BrandStory from "@components/Home/BrandStory";
import FooterHome from "@components/Home/FooterHome";
import Hero from "@components/Home/Hero";
import KhwantaQuote from "@components/Home/KhwantaQuote";
import SuggestProduct from "@components/Home/SuggestProduct";
import useNavBar from "@Zustand/navbarMenu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// export const metadata = {
//   title: "Khwanta",
//   description: "Thai Wisdom to International Fashion",
// };
export default function Page({ params: { lng } }) {
  const router = useRouter();
  const setScrolled = useNavBar((state) => state.setScrolled);
  const isScrolled = useNavBar((state) => state.isScrolled);

  const setColor = useNavBar((state) => state.setColor);
  const setNavShow = useNavBar((state) => state.setNavShow);
  const [scrollPosotion, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const element = document.getElementById("maindiv");
    const scrollPosition = element.scrollTop;
    const maxscrollPosition = element.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPosition / maxscrollPosition) * 100;
    const pointP = ((window.innerHeight * 2) / maxscrollPosition) * 100;
    if (scrollPercent > pointP) {
      document.getElementById("maindiv").classList.remove("snap-mandatory");
    } else {
      document.getElementById("maindiv").classList.add("snap-mandatory");
    }
    setScrollPosition(scrollPosition);
    if (scrollPosition > 0) {
      setScrolled(true);
      setNavShow(true);
    } else {
      setScrolled(false);
      setNavShow(false);
    }
  };
  useEffect(() => {
    setScrolled(false);
    setColor(null);
    setNavShow(false);
  }, []);

  return (
    <div id="maindiv" className={` h-screen overflow-y-scroll overflow-x-hidden w-screen `} onScroll={handleScroll}>
      <div className="w-full snap-start">
        <div
          className="sm:hidden text-3xl sticky max-[320px]:text-base max-[425px]:text-base tracking-widest align-middle select-none text-primary-500 font-secondary drop-shadow-md h-0 transition-transform  top-20 left-5 w-fit "
          style={{ top: `${isScrolled ? "60px" : "20px"}` }}>
          KHWANTA <br /> COLLECTION <br /> 2023
        </div>
        <Hero lng={lng} scrollPosition={scrollPosotion} />
        <div className="absolute top-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-light-300 from-60%   to-light-500"></div>
      </div>

      <div className="w-full snap-start ">
        <KhwantaQuote />
      </div>
      <div className="w-full snap-start ">
        <SuggestProduct lng={lng} />
      </div>
      <div className="w-full snap-center">
        <BrandStory />
      </div>
      <div className="w-full ">
        <FooterHome lng={lng} />
      </div>
    </div>
  );
}
