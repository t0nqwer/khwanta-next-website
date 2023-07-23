import Image from "next/image";

const BrandStory = () => {
  const imgdiv = "w-4/5 max-[425px]:w-full h-[290px] max-[425px]:h-[200px] mx-auto";
  const textdiv =
    "px-2 pt-3 text-2xl max-[425px]:text-xl font-light tracking-wider text-center text-light-500 font-primary";
  return (
    <div className="relative w-full px-20 overflow-hidden py-36 max-[425px]:py-16 h-fit bg-primary-500 max-[425px]:px-5">
      <div className="w-full text-5xl max-[425px]:text-4xl text-center font-secondary text-light-500">
        Our Craft Journey
      </div>
      <div className="grid grid-cols-3 max-[425px]:grid-cols-1    gap-5 px-10 max-[425px]:px-1 pt-10 ">
        <div className="w-full h-full ">
          <div className={imgdiv}>
            <Image
              src="/1V9A2904.png"
              alt="Khwanta ผลิตจากผ้าทอจากชุมชนชาวบ้านจังหวัดหนองบัวลำภู"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
              className="h-full transition-all duration-700 opacity-0 "
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
          <div className={textdiv}>
            <h1 className="text-4xl tracking-widest">วัตถุดิบจากภูมิปัญญา</h1>
            <p>ผ้าทุกผืนของแบรนด์ขวัญตาทอโดยชาวบ้านในจังหวัดหนองบัวลำภู</p>
          </div>
        </div>
        <div className="w-full h-full ">
          <div className={imgdiv}>
            <Image
              src="/2142019_190422_0209 - Copy.jpg"
              alt="แนวคิดการออกแบบ Khwanta"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
              className="h-full transition-all duration-700 opacity-0 "
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
          <div className={textdiv}>
            <h1 className="text-4xl tracking-widest">แนวคิดการออกแบบ</h1>
            <p>
              เรามองผ้าไทยในมุมใหม่ๆ เราออกแบบโดยตั้งใจให้ผ้าไทยวัยไหนก็ใส่ได้ ให้ความรู้สึกพิเศษแก่ผู้สวมใส่
              เพิ่มคุณค่าให้กับผ้าไทย{" "}
            </p>
          </div>
        </div>
        <div className="w-full h-full ">
          <div className={imgdiv}>
            <Image
              src="/DSC00158.jpg"
              alt="งานฝีมือจากชาวบ้านในชุมชน Khwanta"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
              className="h-full transition-all duration-700 opacity-0 "
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
          <div className={textdiv}>
            <h1 className="text-4xl tracking-widest">งานฝีมือจากชาวบ้านในชุมชน</h1>
            <p>
              เราใช้ช่างฝีมือจากชุมชน ในหลากหลายดีไซน์จากแบรนด์ขวัญตา ที่มีการตกแต่งที่เป็นเอกลักษณ์ของแบรนด์
              ซึ่งเป็นงานที่ละเอียด
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandStory;
