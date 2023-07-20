"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSideBar from "@Zustand/sidebarMenu";
import toast from "react-hot-toast";
import useIsLoading from "@Zustand/isLoading";
import Image from "next/image";
import { rgbDataURL } from "@utils/blurimage";

const SelectRecommend = () => {
  const [allProducts, setAllProducts] = useState();
  const [recommendProducts, setRecommendProducts] = useState([]);
  const router = useRouter();
  const setMenu = useSideBar((state) => state.setMenu);
  const innitialmenu = useSideBar((state) => state.innitialmenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);

  const addRecommend = async (id) => {
    if (recommendProducts.length >= 8) return toast.error("สินค้าแนะนำเพื่อได้มากสุดแค่ 8 แบบ");
    setIsLoading(true);
    const response = await fetch("/api/product/recommend", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const recommendations = allProducts.filter((item) => item._id === id);
      const NewAllProduct = allProducts.filter((item) => item._id !== id);
      setRecommendProducts((prev) => [...prev, ...recommendations]);
      setAllProducts(NewAllProduct);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(response.statusText);
    }
  };

  const deleteRecommend = async (id, arrid) => {
    console.log(id);
    setIsLoading(true);
    const response = await fetch("/api/product/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        arrid: arrid,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const recommendations = recommendProducts.filter((item) => item._id !== id);
      const NewAllProduct = recommendProducts.filter((item) => item._id === id);
      const All = allProducts.concat(NewAllProduct).sort((a, b) => {
        return a.order - b.order;
      });

      setRecommendProducts(recommendations);
      setAllProducts(All);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(response.statusText);
    }
  };
  const fetchRecommendProducts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/product/recommend");
    if (response.ok) {
      const data = await response.json();
      const allProductdata = data.data.map((item, i) => ({ ...item, order: i }));
      const datarecommend = data.hero.recommend.map((item) => {
        return { ...item.product, arrID: item._id };
      });
      setAllProducts(allProductdata);
      setRecommendProducts(datarecommend);
      setIsLoading(false);
    } else {
      toast.error(response.statusText);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRecommendProducts();
  }, []);

  return (
    <div className="p-10">
      {recommendProducts && (
        <>
          <div className="flex items-end py-3 text-5xl font-primary">
            <h1 className=" drop-shadow-2xl">สินค้าแนะนำ</h1>{" "}
          </div>
          <div className="grid grid-cols-6 gap-4">
            {recommendProducts.map((product) => (
              <div
                key={product._id}
                className="w-full shadow-lg cursor-pointer h-96 bg-light-200"
                onClick={() => {
                  deleteRecommend(product._id, product.arrID);
                }}>
                <div className="w-full h-80">
                  <Image
                    alt="recommend"
                    src={product.image[0].url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    priority={false}
                    blurDataURL={rgbDataURL(161, 0, 14)}
                  />
                </div>
                <div className="px-3 py-2 leading-7 font-primary text-primary-500 ">
                  <p className="text-xl leading-3 ">
                    {product.code.toUpperCase()} - {product.fabric.name}
                  </p>
                  <p className="mt-3 leading-3 truncate">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {allProducts && (
        <>
          <div className="flex items-end py-3 text-5xl font-primary">
            <h1 className=" drop-shadow-2xl">รายการสินค้า</h1>
            <span className="ml-3 text-base "> (คลิกที่สินค้าเพื่อเพิ่มในสินค้าแนะนำ)</span>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {allProducts.map((product) => (
              <div
                key={product._id}
                className="w-full shadow-lg cursor-pointer h-96 bg-light-200"
                onClick={() => {
                  addRecommend(product._id);
                }}>
                <div className="w-full h-80">
                  <Image
                    alt="All recommend"
                    src={product.image[0].url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    priority={false}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(161, 0, 14)}
                  />
                </div>
                <div className="px-3 py-2 leading-7 font-primary text-primary-500 ">
                  <p className="text-xl leading-3 ">
                    {product.code.toUpperCase()} - {product.fabric.name}
                  </p>
                  <p className="mt-3 leading-3 truncate">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectRecommend;
