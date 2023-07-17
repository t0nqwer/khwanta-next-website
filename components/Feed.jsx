"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Card from "./Card";
const Feed = () => {
  const [Products, setProducts] = useState([]);
  const [height, setHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const fetchData = async () => {
    const response = await fetch("/api/front/product/list");
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
    setHeight((windowWidth / 4 / 3) * 4);
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setHeight((windowWidth / 4 / 3) * 4);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <div className="grid grid-cols-4">
      {Products.map((item) => (
        <Card img={item?.image[0].url} alt={item?.name} height={height} />
      ))}
    </div>
  );
};

export default Feed;
