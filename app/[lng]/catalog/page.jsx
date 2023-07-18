import Feed from "@components/Feed";
import Image from "next/image";
const page = ({ params: { lng } }) => {
  console.log(lng);
  return (
    <div className=" pt-[60px] pb-20">
      <div className="w-full h-96">
        <Image
          src="/DSC_7949-co.jpg"
          className="object-cover object-center"
          alt="catalog"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <Feed lng={lng} />
    </div>
  );
};

export default page;
