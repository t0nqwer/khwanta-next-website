"use client";
import { useState, useEffect, useRef } from "react";
import useSideBar from "@Zustand/sidebarMenu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useIsLoading from "@Zustand/isLoading";
import Image from "next/image";
import useModalState from "@Zustand/ModalState";

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
    pathname: "/kt-admin/products/import?page=1",
  },
];
const page = () => {
  const router = useRouter();
  const [Product, setProduct] = useState([]);
  const setMenu = useSideBar((state) => state.setMenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);
  const modalReset = useModalState((state) => state.modalReset);
  const setShow = useModalState((state) => state.setShow);
  const setQuestion = useModalState((state) => state.setQuestion);
  const setId = useModalState((state) => state.setId);
  const answer = useModalState((state) => state.answer);
  const setAnswer = useModalState((state) => state.setAnswer);
  const modalId = useModalState((state) => state.id);
  useEffect(() => {
    console.log(answer);
    if (answer) {
      deleteHandler();
    }
  }, [answer]);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/product");
    if (response.ok) {
      const data = await response.json();
      setProduct(data);
      console.log(data);
      setIsLoading(false);
    } else {
      toast.error(response.statusText);
      setIsLoading(false);
    }
  };
  const deleteHandler = async (e) => {
    setIsLoading(true);
    const response = await fetch(`/api/product/${modalId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      modalReset();
      fetchData();
      toast.success("ลบข้อมูลสินค้าเรียบร้อย");
    } else {
      modalReset();
      toast.error(response.statusText);
    }
  };
  useEffect(() => {
    fetchData();
    setMenu(links);
  }, []);

  const deleteConfirmHandler = (e) => {
    e.preventDefault();
    const [deletedata] = Product.filter((item) => item._id === e.currentTarget.id);
    console.log(deletedata);
    setAnswer(false);
    setShow(true);
    setId(e.currentTarget.id);
    setQuestion(`คุณต้องการลบ ${deletedata.code} ${deletedata.fabric.name} ใช่หรือไม่ ? `);
  };
  return (
    <>
      <div className="pt-10">
        <div className="grid grid-cols-5 gap-3 px-10 pt-5 pb-10">
          {Product.map((item) => (
            <div
              key={item._id}
              className=" h-[550px] p-5 border border-1 bg-light-500 rounded-md overflow-hidden shadow-md  shadow-primary-300  relative font-primary text-xl">
              <div className="w-full bg-red-900 h-96">
                <Image
                  src={item?.image[0]?.url}
                  alt={`${item?.name}${item?.fabric}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p>รหัส: {item?.code}</p>
              <p>ชื่อ: {item?.name}</p>
              <p>ผ้า: {item?.fabric?.name}</p>
              <p>ราคา: {item?.price}</p>
              <div className="absolute right-0 flex justify-end w-full pr-3 space-x-3 bottom-1 ">
                <button
                  className="bottom-0 right-0 px-2 py-1 text-xl transition-colors rounded-md hover:bg-primary-500 hover:text-light-500 text-primary-500"
                  onClick={() => {
                    router.push(`/kt-admin/products/${item._id}`);
                  }}>
                  แก้ไข
                </button>
                <button
                  id={item._id}
                  className="bottom-0 right-0 px-2 py-1 text-xl transition-colors rounded-md hover:bg-primary-500 hover:text-light-500 text-primary-500"
                  onClick={deleteConfirmHandler}>
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
