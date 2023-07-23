"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { rgbDataURL } from "@utils/blurimage";
import { Thai } from "@utils/currency";
import { useRouter } from "next/navigation";
const SuggestProduct = ({ lng }) => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    const response = await fetch("/api/product/recommend");
    if (response.ok) {
      const data = await response.json();
      const datarecommend = data.hero.recommend.map((item) => {
        return { ...item.product, arrID: item._id };
      });
      console.log(datarecommend);
      setProduct(datarecommend);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-primary-500">
      <div className="grid w-full h-full grid-cols-4 grid-rows-2 ">
        {product &&
          product.map((item) => (
            <div
              key={item._id}
              className="relative w-full h-full overflow-hidden text-xl font-primary"
              onMouseOut={(e) => {
                e.preventDefault();
                document.getElementById(`${item?._id}-image`).classList.remove(`scale-110`);
                document.getElementById(`${item._id}`).classList.add(`opacity-0`);
              }}
              onMouseOver={(e) => {
                e.preventDefault();
                document.getElementById(`${item?._id}-image`).classList.add(`scale-110`);
                document.getElementById(`${item._id}`).classList.remove(`opacity-0`);
              }}
              onClick={() => router.push(`/${lng}/product/${item._id}`)}>
              <div
                id={item?._id}
                className="absolute bottom-0 z-30 flex flex-col items-center w-full py-2 transition-opacity duration-500 bg-white opacity-0 bg-opacity-40 backdrop-blur ">
                <h1>{item?.name}</h1>
                <h1>{Thai.format(item?.price)}</h1>
              </div>
              <Image
                id={`${item?._id}-image`}
                src={item.image[0].url}
                alt={`${item.name}${item.fabric.name}`}
                className="transition-all duration-500 opacity-0"
                onLoadingComplete={(image) => image.classList.remove("opacity-0")}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                placeholder="blur"
                blurDataURL={rgbDataURL(161, 0, 14)}
              />
            </div>
          ))}
        {/* <div className="w-full h-full bg-light-700"></div>
        <div className="w-full h-full bg-light-800"></div>
        <div className="w-full h-full bg-light-900"></div>
        <div className="w-full h-full bg-light-100"></div>
        <div className="w-full h-full bg-light-200"></div>
        <div className="w-full h-full bg-light-300"></div>
        <div className="w-full h-full bg-light-400"></div>
        <div className="w-full h-full bg-light-500"></div> */}
      </div>
    </div>
  );
};

export default SuggestProduct;
