"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useNavBar from "@Zustand/navbarMenu";
import { rgbDataURL } from "@utils/blurimage";

const image = ["/web-5.png", "/web-6.png", "/web-7.png", "/web-8.png"];
const Hero = ({ lng, scrollPosition }) => {
  const router = useRouter();
  const [ImageUrl, setImageUrl] = useState("/web-5.png");
  const [count, setCount] = useState(0);
  const setNavShow = useNavBar((state) => state.setNavShow);
  const setScrolled = useNavBar((state) => state.setScrolled);
  const isScrolled = useNavBar((state) => state.isScrolled);
  const [currentImage, setCurrentImage] = useState("/web-5.png");
  const changeImage = () => {
    console.log(ImageUrl);
    const img = image.indexOf(ImageUrl);
    console.log(img);
    const url = image[img + 1];
    console.log(url);
    setImageUrl(url);
    // const newcount = count + 1 === image.length ? 0 : count + 1;
    // console.log(img);

    // setCount(newcount);
  };

  useEffect(() => {
    document.getElementById(ImageUrl)?.classList.add("opacity-0");
    setTimeout(() => {
      setImageUrl(currentImage);
    }, 500);
  }, [currentImage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(image[Math.floor(Math.random() * image.length)]);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollHandler = (e) => {
    console.log(e);
  };
  useEffect(() => {
    if (isScrolled) {
      document.getElementById("khwantatext").classList.add("opacity-0");
    } else {
      document.getElementById("khwantatext").classList.remove("opacity-0");
    }
  }, [isScrolled]);

  return (
    <div className="relative w-full h-screen max-[420px]:h-[650px]   " onScroll={scrollHandler}>
      <div className="absolute top-0 left-0 z-50 flex justify-center w-full h-full ">
        <div
          className="  w-[300px] h-full"
          onMouseOver={() => {
            document.getElementById("image-slide").classList.add("z-20");
            document.getElementById("image-slide").classList.add("scale-110");
          }}
          onMouseOut={() => {
            document.getElementById("image-slide").classList.remove("z-20");
            document.getElementById("image-slide").classList.remove("scale-110");
          }}></div>
      </div>
      <div
        id="collectiontext"
        className="absolute top-5 left-10 max-[420px]:top-15 max-[420px]:left-3 max-[850px]:hidden ">
        <h1 className="text-3xl sticky max-[320px]:text-base max-[425px]:text-base tracking-widest align-middle select-none text-primary-500 font-secondary drop-shadow-md h-fit transition-transform">
          KHWANTA <br /> COLLECTION <br /> 2023
        </h1>
        <div className="w-full h-1 rounded-full bg-primary-500 max-[425px]:hidden " />
      </div>
      <div id="image-slide" className="absolute top-0 left-0 w-full h-full transition-all duration-300 ">
        {ImageUrl && (
          <Image
            id={ImageUrl}
            src={ImageUrl}
            alt="/web4.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            placeholder="blur"
            blurDataURL={rgbDataURL(161, 0, 14)}
            className="object-contain h-full transition-all duration-500 opacity-0 "
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
        )}
      </div>
      <div id="" className="top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
        <div
          id="khwantatext"
          className=" transition-all tracking-widest text-center align-middle bg-light-300 bg-opacity-0  max-[425px]:bg-opacity-30  cursor-pointer select-none text-primary-500 font-secondary text-[150px] max-[425px]:text-[60px] max-[850px]:text-[100px] max-[425px]:backdrop-blur-sm max-[320px]:text-[40px] backdrop-opacity-90 duration-500 ">
          <h1 id="khwanta" className="transition-all textshadow text-shadow-lg drop-shadow-lg ">
            KHWANTA
          </h1>
        </div>
      </div>
      <div className="absolute bottom-0 max-[425px]:w-full right-0 flex items-end justify-between max-[500px]:justify-center  p-10 max-[425px]:p-5 z-100">
        <div
          className="px-5 py-2 border cursor-pointer max-[425px]:bg-white max-[425px]:bg-opacity-10   max-[425px]:backdrop-blur-sm border-primary-500 hover:scale-110"
          onClick={() => {
            router.push(`${lng}/catalog`);
            setNavShow(true);
            setScrolled(true);
          }}>
          <h1 className="text-xl tracking-widest text-center align-middle cursor-pointer select-none text-primary-500 font-secondary drop-shadow-md h-fit">
            VIEW COLLECTION
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
