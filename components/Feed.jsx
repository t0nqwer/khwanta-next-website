"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Card from "./Card";

const Feed = ({ lng }) => {
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);
  const [height, setHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/front/product/list");
    const data = await response.json();
    setProducts(data);
    setLoading(false);
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
    <>
      <div className="grid grid-cols-4">
        {Products.map((item) => (
          <div key={item._id}>
            <Card lng={lng} img={item?.image[0].url} alt={item?.name} height={height} data={item} />
          </div>
        ))}
      </div>
      {loading && <div className="flex justify-center w-full"></div>}
    </>
  );
};

export default Feed;
