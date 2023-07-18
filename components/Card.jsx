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
        document.getElementById(`${data?._id}-image`).classList.remove(`scale-110`);
        document.getElementById(`${data._id}`).classList.add(`opacity-0`);
      }}
      onMouseOver={(e) => {
        e.preventDefault();
        document.getElementById(`${data?._id}-image`).classList.add(`scale-110`);
        document.getElementById(`${data._id}`).classList.remove(`opacity-0`);
      }}
      onClick={() => router.push(`/${lng}/product/${data._id}`)}>
      <div
        id={data?._id}
        className="absolute bottom-0 z-30 flex flex-col items-center w-full py-2 transition-opacity duration-500 bg-white opacity-0 bg-opacity-40 backdrop-blur ">
        <h1>{data?.name}</h1>
        <h1>{Thai.format(data?.price)}</h1>
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
