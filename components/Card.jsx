import React from "react";
import Image from "next/image";
import { Thai } from "@utils/currency";
const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
import { useRouter } from "next/navigation";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
const Card = ({ img, alt, height, data, lng }) => {
  const router = useRouter();

  return (
    <div
      className={`w-full bg-primary-500 relative cursor-pointer overflow-hidden  font-primary text-xl
      `}
      style={{ height: height }}
      onMouseOut={(e) => {
        e.preventDefault();
        if (window.innerWidth > 425) {
          document.getElementById(`${data?._id}-image`).classList.remove(`scale-110`);
          document.getElementById(`${data._id}`).classList.add(`md:opacity-0`);
        }
      }}
      onMouseOver={(e) => {
        e.preventDefault();
        if (window.innerWidth > 425) {
          document.getElementById(`${data?._id}-image`).classList.add(`scale-110`);
          document.getElementById(`${data._id}`).classList.remove(`md:opacity-0`);
        }
      }}
      onClick={() => router.push(`/${lng}/product/${data._id}`)}>
      <div
        id={data?._id}
        className="absolute bottom-0 z-30 flex flex-col items-center w-full py-2 transition-opacity duration-500 bg-white max-md:opacity-100 max-[425px]:text-base  md:opacity-0   bg-opacity-40 backdrop-blur  max-[850px]:backdrop-opacity-80 md:h-[76px] md:leading-4  max-[425px]:max-h-14 leading-3 tracking-wider ">
        <h1 className="w-full px-4 md:px-8 truncate text-2xl max-[425px]:text-base">{data?.name}</h1>
        <h1 className="w-full px-4 md:px-8 truncate max-[425px]:text-base">{Thai.format(data?.price)}</h1>
      </div>
      <Image
        src={img}
        alt={alt}
        id={`${data?._id}-image`}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        loading="lazy"
        className="transition-all duration-500 opacity-0"
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        placeholder="blur"
        blurDataURL={rgbDataURL(2, 129, 210)}
      />
    </div>
  );
};

export default Card;
