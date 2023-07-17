"use client";
import { useEffect, useState } from "react";
import SizeTable from "./SizeTable";
import ImageSlider from "./ImageSlider";

const SingleProduct = ({ data, image }) => {
  const [Images, setImages] = useState([]);
  const [Sizedata, setSizedata] = useState([]);
  const [SizeList, setSizeList] = useState([]);
  useEffect(() => {
    // console.log(data);
    if (data) {
      const arr = [{ Size_ID: "" }];
      if (data?.design?.Size) {
        setSizeList(arr.concat(data?.design?.Size.map((e) => e)));
        setSizedata(data?.design?.Size[0]?.Size_De_Info);
      }
    }
  }, [data]);
  useEffect(() => {
    // const detailimage = image?.map((e) => e.Img_Url);
    const imageArr = [{ url: data.Front_img, show: true }, { url: data.Back_img, show: true }, ...image];
    setImages(imageArr);
  }, [image]);
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto lg:flex-row snap-y">
        <div className="relative xl:w-1/3 lg:w-1/2 shrink-0 ">
          {Images.map((image) => {
            if (window.innerWidth >= 1024)
              if (image.show) {
                return (
                  <div key={image.url} className="relative w-full border-0 ">
                    <img src={image.url} alt="" className="object-cover" />
                  </div>
                );
              }
          })}
          {window.innerWidth < 1024 ? <ImageSlider images={Images} /> : ""}
        </div>
        <div className="sticky top-0 right-0 flex items-center justify-center bg-white xl:w-2/3 lg:w-1/2 shrink-0 lg:h-screen ">
          <div className="lg:w-[23rem] w-2/3 mx-auto lg:py-0 py-10 ">
            <h1 className="w-full text-base text-right text-neutral-500 ">{data?.code}</h1>
            <h1 className="mt-2 text-xl font-semibold ">{data?.design?.Design_Name}</h1>
            <h3 className="mt-1 text-sm  text-neutral-500">
              {data &&
                `ผ้า${data?.fabric?.Type?.name}${data?.fabric?.Weaving.weaving_name}${
                  data?.fabric?.Color?.FabricColorTechnique_name !== "เคมี"
                    ? data?.fabric?.Color?.FabricColorTechnique_name
                    : ""
                }${data?.fabric?.Pattern?.FabricPatternName ? data?.fabric?.Pattern?.FabricPatternName : ""}`}
            </h3>
            <h2 className="mt-1 text-base font-semibold ">฿ {data?.price}</h2>
            <div className="mt-5 border-t border-black border-1"></div>
            <h2 className="mt-3 text-lg font-semibold text-center "> ขนาด</h2>
            <div className="flex justify-center w-full mt-2">
              <SizeTable data={data} SizeList={SizeList} Sizedata={Sizedata} />
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
      <div className="w-full p-10 text-3xl bg-white border-t-2 font-primary ">
        <h1>Description</h1>
        <h2 className="mt-2 text-2xl">{data?.Description_Web}</h2>
      </div>
      <div className="w-full p-10 text-3xl bg-white border-t-2 font-primary ">
        <h1>Same Design</h1>
      </div>
      <div className="w-full p-10 text-3xl bg-white border-t-2 font-primary ">
        <h1>Recommended Product</h1>
      </div>
    </div>
  );
};

export default SingleProduct;
