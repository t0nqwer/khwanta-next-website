"use client";
import { useState, useEffect, useRef } from "react";
import useSideBar from "@Zustand/sidebarMenu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useIsLoading from "@Zustand/isLoading";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { MdClose } from "react-icons/md";
import Pagination from "@components/Pagination";
const links = [
  {
    title: "Back",
    pathname: "/kt-admin",
  },
  {
    title: "แก้ไขข้อมูลสินค้า",
    pathname: "/kt-admin/products",
  },
  {
    title: "เพิ่มสินค้า",
    pathname: "/kt-admin/products/import",
  },
];

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query") || "";
  const search = searchParams.get("search") || "";
  const [Product, setProduct] = useState([]);
  const [pageAmount, setPageAmount] = useState(1);
  const setMenu = useSideBar((state) => state.setMenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);
  const [querydata, setQuerydata] = useState([]);
  const searchRef = useRef(null);
  const fetchData = async () => {
    setIsLoading(true);
    const products = await fetch(`/api/product/list?page=${page}&query=${query}&search=${search}`);
    const dataproduct = await products.json();
    console.log(dataproduct);
    if (products.ok) {
      setProduct(dataproduct.Cloth);
      setPageAmount(Number(dataproduct.page));
      setIsLoading(false);
    } else {
      toast.error(products.statusText);
      setIsLoading(false);
    }
  };
  const getQueryData = async () => {
    setIsLoading(true);
    const querydata = await fetch(`/api/product/querydata`);
    const data = await querydata.json();
    if (querydata.ok) {
      setQuerydata(data);
    } else {
      toast.error(querydata.statusText);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getQueryData();
  }, []);
  useEffect(() => {
    fetchData();
    setMenu(links);
    document.getElementById("searchinput").value = search;
    console.log(page);
  }, [page, query, search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/kt-admin/products/import?search=${searchRef.current.value}&page=${1}`);
  };
  return (
    <div className="pt-10">
      {/* search */}
      <div className="w-full mt-5">
        <div className="flex justify-center mx-5 overflow-hidden text-primary-500 ">
          <div className=" rounded-lg overflow-hidden text-xl py-2 px-3 md:w-[500px] w-full flex bg-light-500 border border-primary-200 items-center text-secondary-500">
            <form className="grow" onSubmit={handleSubmit}>
              <input
                id="searchinput"
                type="text"
                className="w-full pl-2 bg-transparent placeholder:text-primary-400 focus:outline-none text-primary-500"
                placeholder="ค้นหา...."
                ref={searchRef}
              />
              <input type="submit" hidden />
            </form>
            {search !== "" && (
              <div
                className="pr-2 cursor-pointer text-brandred"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/kt-admin/products/import?page=${1}`);
                }}>
                <MdClose />
              </div>
            )}

            <div className="cursor-pointer " onClick={handleSubmit}>
              <AiOutlineSearch />
            </div>
          </div>
        </div>
      </div>
      {/* query */}
      <div className="flex items-center justify-center w-full pt-10 ">
        <div className="flex items-center px-10 mb-8 overflow-hidden text-secondary-500">
          <div className="flex items-center justify-around space-x-12 font-secondary">
            <div
              className={`${
                query === ""
                  ? "border border-primary-500 text-primary-500"
                  : "hover:bg-primary-500 hover:text-light-500"
              } px-4 py-2 rounded  font-semibold transition-colors duration-300  cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/kt-admin/products/import?search=${search}&page=${1}&query=`);
              }}>
              ALL
            </div>
            {querydata.map((e) => (
              <div
                key={e}
                id={e}
                className={`${
                  e === query
                    ? "border border-primary-500 text-primary-500"
                    : "hover:bg-primary-500 hover:text-light-500"
                } px-4 py-2 rounded  font-semibold transition-colors duration-300 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/kt-admin/products/import?search=${search}&page=${1}&query=${e.currentTarget.id}`);
                }}>
                {e.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* products */}
      <div className="grid grid-cols-5 gap-3 px-10 pt-5 pb-10">
        {Product.map((item) => (
          <div
            key={item.Id}
            className=" h-[550px] p-5 border border-1 bg-light-500 rounded-md overflow-hidden shadow-md  shadow-primary-300  relative font-primary text-xl">
            <div className="w-full bg-red-900 h-96">
              <Image
                src={item.Front_Thumbnail}
                alt={`${item?.designname}${item.fabric}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <p>รหัส: {item.code}</p>
            <p>ชื่อ: {item.designname}</p>
            <p>ผ้า: {item.fabric}</p>
            <p>ราคา: {item.price}</p>
            <button
              className="absolute bottom-0 right-0 p-2 text-xl rounded-md hover:bg-primary-500 hover:text-light-500 text-primary-500"
              onClick={() => {
                router.push(`/kt-admin/products/import/${item.Id}`);
              }}>
              เพิ่มลงเว็ปไซต์
            </button>
          </div>
        ))}
      </div>
      {/* pagination */}
      <div className="w-full pb-20 ">
        <Pagination
          pagee={page}
          limit={pageAmount}
          Navito={`/kt-admin/products/import?search=${search}&query=${query}`}
        />
      </div>
    </div>
  );
};

export default page;
