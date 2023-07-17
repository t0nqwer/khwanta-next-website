import React from "react";
import Image from "next/image";
const Card = ({ img, alt, height }) => {
  console.log(height);
  return (
    <div className={`w-full bg-primary-500`} style={{ height: height }}>
      <Image
        src={img}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Card;
