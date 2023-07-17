import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full sm:h-screen h-3/4">
      {/* <div className="absolute z-30 bottom-20 left-7 text-secondary text-9xl">
        New <br /> Collection
      </div> */}

      <video className="object-cover max-sm:h-full " muted autoPlay loop>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/khwantadashboard.appspot.com/o/final.mov?alt=media&token=dbf4b9b5-936c-45a6-ab64-e6a700d3e349"
          className="w-full bg-orange-500 "
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Hero;
