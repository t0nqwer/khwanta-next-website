import Image from "next/image";
import { useRouter } from "next/navigation";
import useNavBar from "@Zustand/navbarMenu";
const Hero = ({ lng }) => {
  const router = useRouter();
  const setNavShow = useNavBar((state) => state.setNavShow);
  const setScrolled = useNavBar((state) => state.setScrolled);
  return (
    <div className="relative w-full sm:h-screen h-3/4   bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-200 from-50%   to-primary-300">
      <div className="absolute top-0 left-0 flex justify-center w-full h-full z-100 ">
        <div
          className="  w-[300px] h-full"
          onMouseOver={() => {
            document.getElementById("image-slide").classList.add("z-20");
            document.getElementById("image-slide").classList.add("scale-110");
          }}
          onMouseOut={() => {
            document.getElementById("image-slide").classList.remove("z-20");
            document.getElementById("image-slide").classList.remove("scale-110");
          }}></div>
      </div>
      <div className="absolute h-1 rounded-full w-11 bg-light-500 top-10 left-10"></div>
      <div
        id="image-slide"
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 "
        onMouseOver={() => console.log("yess")}>
        <Image
          src="/web-5.png"
          alt="/web4.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          loading="lazy"
          className="h-full transition-all duration-1000 opacity-0 "
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        />
      </div>
      <div id="" className="top-0 left-0 z-50 flex items-center w-full h-full ">
        <div className="w-full transition-all tracking-widest text-center align-middle cursor-pointer select-none text-light-500 font-secondary text-[150px] drop-shadow-md ">
          <h1>KHWANTA</h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex items-end justify-between w-full  p-10 p z-[200]">
        <h1 className="text-3xl tracking-widest text-center align-middle select-none text-light-500 font-secondary drop-shadow-md h-fit">
          KHWANTA COLLECTION 2023
        </h1>
        <div
          className="px-5 py-2 border cursor-pointer border-light-500"
          onClick={() => {
            router.push(`${lng}/catalog`);
            setNavShow(true);
            setScrolled(true);
          }}>
          <h1 className="text-xl tracking-widest text-center align-middle cursor-pointer select-none text-light-500 font-secondary drop-shadow-md h-fit">
            VIEW COLLECTION
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
