import Image from "next/image";

const BrandStory = () => {
  return (
    <div className="relative w-full px-20 overflow-hidden py-36 h-fit bg-primary-500">
      <div className="w-full text-5xl text-center font-secondary text-light-500">Our Craft Journey</div>
      <div className="grid grid-cols-3 gap-5 px-10 pt-10 ">
        <div className="w-full h-full ">
          <div className="w-4/5 h-[290px] mx-auto">
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
          <div className="px-2 pt-3 text-2xl font-light tracking-wider text-center text-light-500 font-primary">
            <h1 className="text-4xl tracking-widest">วัตถุดิบจากภูมิปัญญา</h1>
            <p>ผ้าทุกผืนของแบรนด์ขวัญตาทอโดยชาวบ้านในจังหวัดหนองบัวลำภู</p>
          </div>
        </div>
        <div className="w-full h-full ">
          <div className="w-4/5 h-[290px] mx-auto">
            <Image
              src="/2142019_190422_0209 - Copy.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
              className="h-full transition-all duration-700 opacity-0 "
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
          <div className="px-2 pt-3 text-2xl font-light tracking-wider text-center text-light-500 font-primary">
            <h1 className="text-4xl tracking-widest">แนวคิดการออกแบบ</h1>
            <p>
              เรามองผ้าไทยในมุมใหม่ๆ เราออกแบบโดยตั้งใจให้ผ้าไทยวัยไหนก็ใส่ได้ ให้ความรู้สึกพิเศษแก่ผู้สวมใส่
              เพิ่มคุณค่าให้กับผ้าไทย{" "}
            </p>
          </div>
        </div>
        <div className="w-full h-full ">
          <div className="w-4/5 h-[290px] mx-auto">
            <Image
              src="/DSC00158.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
              className="h-full transition-all duration-700 opacity-0 "
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
          <div className="px-2 pt-3 text-2xl font-light tracking-wider text-center text-light-500 font-primary">
            <h1 className="text-4xl tracking-widest">งานฝีมือจากชาวบ้านในชุมชน</h1>
            <p>
              ในหลากหลายดีไซน์จากแบรนด์ขวัญตา จะมีการตกแต่งที่เป็นเอกลักษณ์ของแบรนด์ ซึ่งเป็นงานที่ละเอียด
              และต้องใช้ช่างที่ฝีมือ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandStory;
