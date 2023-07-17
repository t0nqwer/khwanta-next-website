"use client";
import BrandStory from "@components/Home/BrandStory";
import Hero from "@components/Home/Hero";
import SuggestProduct from "@components/Home/SuggestProduct";
import useNavBar from "@Zustand/navbarMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const metadata = {
  title: "Khwanta",
  description: "Thai Wisdom to International Fashion",
};
export default function Page({ params: { lng } }) {
  const router = useRouter();
  const setScrolled = useNavBar((state) => state.setScrolled);
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
    if (scrollPosition > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    setScrolled(false);
  }, []);

  return (
    <div id="maindiv" className={` h-screen overflow-y-scroll w-screen`} onScroll={handleScroll}>
      <div className="w-full h-screen snap-start ">
        <Hero />
      </div>
      <div className="w-full h-screen snap-start ">
        <SuggestProduct />
      </div>
      <div className="w-full h-screen snap-center">
        <BrandStory />
      </div>
      <div className=" h-[500px] w-full ">{/* <SuggestProduct />  */}</div>
    </div>
  );
}
