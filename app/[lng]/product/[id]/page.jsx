"use client";
import { useEffect, useState } from "react";
import useIsLoading from "@Zustand/isLoading";
import Image from "next/image";
import { Thai } from "@utils/currency";
import { useRouter } from "next/navigation";
import SizeTable from "@components/SizeTable";
import SuggestProduct from "@components/Home/SuggestProduct";
import useNavBar from "@Zustand/navbarMenu";
const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const page = ({ params: { id } }) => {
  const setIsLoading = useIsLoading((state) => state.setIsLoading);
  const [product, setProduct] = useState(null);
  const [Sizedata, setSizedata] = useState([]);
  const [SizeList, setSizeList] = useState([]);
  const setColor = useNavBar((state) => state.setColor);
  const setScrolled = useNavBar((state) => state.setScrolled);
  const fetchProduct = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setProduct(data);
      const arr = [{ Size_ID: "" }];
      setSizeList(arr.concat(data?.size.map((e) => e)));
      setSizedata(data?.size[0]?.Size_De_Info);
      setIsLoading(false);
    }
  };
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
    fetchProduct();
    setScrolled(false);
    setColor("primary-500");
  }, []);

  return (
    <div
      id="maindiv"
      className="relative flex flex-col w-full overflow-x-hidden overflow-y-auto lg:flex-row snap-y"
      onScroll={handleScroll}>
      <div className="relative z-50 shrink-0 ">
        {" "}
        <SuggestProduct />
      </div>
      <div className="relative w-full shrink-0 lg:h-screen ">
        <div className="w-1/2">
          {product?.image.map((image) => {
            if (image.show) {
              if (window.innerWidth >= 1024)
                return (
                  <div key={image.url} className="relative w-full border-0 ">
                    <Image
                      src={image.url}
                      alt={`${product?.name}${product?.fabric?.name}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                      className="object-cover w-full transition-all duration-500 opacity-0"
                      onLoadingComplete={(image) => image.classList.remove("opacity-0")}
                      placeholder="blur"
                      blurDataURL={rgbDataURL(2, 129, 210)}
                    />
                  </div>
                );
            }
          })}
        </div>
        {/* {window.innerWidth < 1024 ? <ImageSlider images={Images} /> : ""} */}
        <div className="relative z-50 h-screen bg-white shrink-0 "></div>
      </div>

      <div className="sticky top-0 right-0 flex items-center justify-center w-1/2 bg-white shrink-0 lg:h-screen ">
        <div className="lg:w-[23rem] w-2/3 mx-auto lg:py-0 py-10 ">
          <h1 className="w-full text-base text-right text-neutral-500 ">{product?.code}</h1>
          <h1 className="mt-2 text-xl font-semibold ">{product?.name}</h1>
          <h3 className="mt-1 text-sm text-neutral-500">{product && `${product?.fabric?.name}`}</h3>
          <h2 className="mt-1 text-base font-semibold ">{Thai.format(product?.price)}</h2>
          <div className="mt-5 border-t border-black border-1"></div>
          <h2 className="mt-3 text-lg font-semibold text-center "> ขนาด</h2>
          <div className="flex justify-center w-full mt-2">
            <SizeTable data={product} SizeList={SizeList} Sizedata={Sizedata} />
          </div>
          <div className="mt-5 border-t border-black border-1"></div>
          <div className="mt-4 text-sm text-neutral-500">
            {product?.detail.map((e) => (
              <div> - {e.detail}</div>
            ))}
          </div>
          <button
            onClick={() => window.open("https://lin.ee/M3rLQI1", "_blank")}
            className="w-full p-4 mt-5 text-xl text-white rounded-full bg-primary-500 hover:bg-white hover:border border-primary-500 hover:text-primary-500">
            เพิ่มเพื่อนเลย
          </button>
          <h2 className="mt-5 text-lg">
            สอบถามข้อมูลเพิ่มเติมทาง <b>LINE</b> พร้อมบริการสั่งซื้อและจัดส่งฟรี
          </h2>
        </div>
      </div>
    </div>
  );
};

export default page;
