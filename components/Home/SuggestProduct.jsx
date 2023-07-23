"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { rgbDataURL } from "@utils/blurimage";
import { Thai } from "@utils/currency";
import { useRouter } from "next/navigation";
import { shuffle } from "@utils/fucntion";
const SuggestProduct = ({ lng }) => {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    const response = await fetch("/api/product/recommend");
    if (response.ok) {
      const data = await response.json();
      const datashuffle = shuffle(data.hero.recommend);
      const datarecommend = datashuffle.map((item, i) => {
        if (window.innerWidth <= 425 && i < 4) {
          return { ...item.product, arrID: item._id };
        }
        if (window.innerWidth <= 850 && i < 6) {
          console.log("you can");
          return { ...item.product, arrID: item._id };
        }
        if (window.innerWidth > 850) {
          console.log("you can");
          return { ...item.product, arrID: item._id };
        }
      });
      const pro = datarecommend.filter((item, i) => item);
      console.log(pro);
      setProduct(pro);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div className="relative overflow-hidden bg-primary-500">
      <div className="grid w-full h-full grid-cols-4 max-[425px]:grid-cols-2 max-[850px]:grid-cols-3 grid-rows-2 ">
        {product &&
          product.map((item) => (
            <div
              key={item._id}
              className="relative w-full h-full overflow-hidden text-xl cursor-pointer font-primary"
              onMouseOut={(e) => {
                e.preventDefault();
                if (window.innerWidth > 850) {
                  document.getElementById(`${item?._id}-image`).classList.remove(`scale-110`);
                  document.getElementById(`${item._id}`).classList.add(`lg:opacity-0`);
                }
              }}
              onMouseOver={(e) => {
                e.preventDefault();
                if (window.innerWidth > 850) {
                  document.getElementById(`${item?._id}-image`).classList.add(`scale-110`);
                  document.getElementById(`${item._id}`).classList.remove(`lg:opacity-0`);
                }
              }}
              onClick={() => router.push(`/${lng}/product/${item._id}`)}>
              <div
                id={item?._id}
                className="absolute bottom-0 z-30 flex flex-col items-center w-full py-2 transition-opacity duration-500 bg-white lg:opacity-0 max-[425px]:opacity-100 bg-opacity-40 backdrop-blur max-[850px]:backdrop-opacity-80 text-center max-h-16 max-[425px]:text-lg  ">
                <p className="w-full px-2 truncate">{item?.name}</p>
                <p className="w-full px-2 truncate">{Thai.format(item?.price)}</p>
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
      </div>
    </div>
  );
};

export default SuggestProduct;
