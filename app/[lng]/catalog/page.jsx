"use client";
import Feed from "@components/Feed";
import Image from "next/image";
import useNavBar from "@Zustand/navbarMenu";
import FooterHome from "@components/Home/FooterHome";
const page = ({ params: { lng } }) => {
  const setScrolled = useNavBar((state) => state.setScrolled);
  setScrolled(true);
  return (
    <div className=" pt-[60px] ">
      <div className="w-full h-96  max-[425px]:h-52">
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
      <FooterHome lng={lng} />
    </div>
  );
};

export default page;
