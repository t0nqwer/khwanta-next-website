"use client";
import { useState, useEffect } from "react";
import useSideBar from "@Zustand/sidebarMenu";
import useIsLoading from "@Zustand/isLoading";
import { url } from "@utils/URL";

import { MdOutlineEdit, MdClose, MdAdd } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiCamera } from "react-icons/fi";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useRouter } from "next/navigation";
import SizeTable from "@components/SizeTable";
const links = [
  {
    title: "Back",
    pathname: "/kt-admin/products/import",
  },
];
const page = ({ params }) => {
  const router = useRouter();

  //state
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [Name, setName] = useState("");
  const [isDesEdit, setIsDesEdit] = useState(false);
  const [desBfChange, setDesBfChange] = useState("");
  const [isAddDetail, setIsAddDetail] = useState(false);
  const [detail, setDetail] = useState("");
  const [Product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [Front, setFront] = useState();
  const [Back, setBack] = useState();
  const [frontUrl, setFrontUrl] = useState("");
  const [backUrl, setBackUrl] = useState("");
  const [Sizedata, setSizedata] = useState([]);
  const [SizeList, setSizeList] = useState([]);
  const setMenu = useSideBar((state) => state.setMenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);
  const inputcss = "w-full bg-primary-400 p-5 rounded-md text-light-500 outline-none text-lg font-semibold";
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/web/SingleProduct/${params.id}`);
    const data = await response.json();
    console.log(data);
    if (data) {
      setIsLoading(false);
    }
    const image = data.Product_Cloth_Detail?.map((e) => ({
      url: e.Img_Url,
      show: false,
    }));
    setImage(image);
    const arr = [{ Size_ID: "" }];
    setSizeList(arr.concat(data?.design.Size.map((e) => e)));
    setSizedata(data?.design.Size[0]?.Size_De_Info);
    setProduct({ ...data, Description_Web: "", ProductDetail: [] });
    setBackUrl(data.Back_img);
    setFrontUrl(data.Front_img);
  };
  useEffect(() => {
    fetchData();
    setMenu(links);
  }, []);
  const onSelectFrontFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFront("");
      return;
    }
    setFront(e.target.files[0]);
  };
  const onSelectBackFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setBack("");
      return;
    }
    setBack(e.target.files[0]);
  };
  useEffect(() => {
    if (!Front) {
      setFrontUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(Front);
    setFrontUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [Front]);
  useEffect(() => {
    if (!Back) {
      setBackUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(Back);
    setBackUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [Back]);

  const addImage = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const fileRef = ref(storage, `Product/detail/${Product.code}${Product.fabric.Fabric_ID}-${new Date().getTime()}`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadurl = await getDownloadURL(uploadTaskSnapshot.ref);
    const response = await fetch(`${url}/web/adddetailphoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: downloadurl, id: Product.product_id }),
    });
    if (response.ok) {
      const data = await response.json();
      const image = data.Product_Cloth_Detail?.map((e) => ({
        url: e.Img_Url,
        show: false,
      }));
      setImage(image);
      setProduct({ ...data, Description_Web: "", ProductDetail: [] });
      setBackUrl(data.Back_img);
      setFrontUrl(data.Front_img);
      toast.success("เพิ่มรูปเรียบร้อย");
      setIsLoading(false);
    } else {
      const desertRef = ref(storage, downloadurl);
      deleteObject(desertRef).then(() => {
        toast.error("ไม่สามารถเพิ่มรูปได้");
        setIsLoading(false);
      });
    }
  };
  const handleEditName = () => {
    setIsNameEdit(true);
    setName(Product?.design?.Design_Name);
  };
  useEffect(() => {
    console.log(image);
  }, [image]);
  const choosePhoto = (e) => {
    let olddata = image;
    const objIndex = olddata.findIndex((obj) => obj.url === e.currentTarget.id);
    if (objIndex !== -1) {
      console.log(objIndex, e.currentTarget.id);
      olddata[objIndex].show = !olddata[objIndex].show;
      setImage([...olddata]);
      const element = document.getElementById(`${e.currentTarget.id}input`);
      element.checked = olddata[objIndex]?.show;
    } else {
      const objIndex = olddata.findIndex((obj) => `${obj.url}input` === e.currentTarget.id);

      olddata[objIndex].show = !olddata[objIndex].show;
      setImage([...olddata]);
      const element = document.getElementById(`${e.currentTarget.id}`);
      element.checked = olddata[objIndex]?.show;
    }
  };
  const reqChangeDesignName = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${url}/web/ChangeDesignName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Name,
        code: Product?.code,
      }),
    });
    if (response.ok) {
      setIsLoading(false);
      const data = await response.json();
      toast.success(data);
      setName("");
      setIsNameEdit(false);
      fetchData();
    } else {
      setIsLoading(false);
      const data = await response.json();
      toast.error(data.error);
    }
  };
  const updateDes = (e) => {
    setProduct({
      ...Product,
      Description_Web: e.target.value,
    });
  };
  const saveProduct = async (data) => {
    setIsLoading(true);
    console.log(data);
    const response = await fetch(`/api/product/import`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setIsLoading(false);
      const data = await response.json();
      toast.success("เพิ่มสินค้าเรียบร้อย");
      router.push("/kt-admin/products/import");
    } else {
      console.log(response);
      const data = await response.json();
      console.log(data);
      toast.error("ไม่สามารถสินค้าได้");
      setIsLoading(false);
    }
  };
  const saveProductHandler = async () => {
    const imagee = [
      { url: Product.Front_img, show: true, position: "front" },
      { url: Product.Back_img, show: true, position: "back" },
      ...image,
    ];
    const data = {
      id: Product.product_id,
      code: Product?.code,
      name: Product?.design?.Design_Name,
      fabric: { name: Product?.fabric.name, id: Product?.fabric.Fabric_ID },
      price: Product?.price,
      description: Product?.Description_Web,
      detail: Product?.ProductDetail,
      image: imagee,
      category: Product?.design.Category.Design_Category_Name,
      brand: Product?.design.Brand.DesignBrand_Name,
      size: Product?.design.Size,
    };
    if (data.detail.length === 0) return toast.error("โปรดกรอกรายละเอียด");
    if (isAddDetail) return toast.error("มีรายละเอียดสินค้าที่คุณยังไม่ได้บันทึก");
    if (isNameEdit) return toast.error("คุณยังไม่ได้บันทึกชื่อ");
    if (isDesEdit) return toast.error("คุณยังไม่ได้บันทึกคำอธิบายสินค้า");
    saveProduct(data);
  };
  const addDetailHandler = (e) => {
    setProduct((prev) => ({ ...prev, ProductDetail: [...prev.ProductDetail, { id: Date.now(), detail }] }));
    setIsAddDetail(false);
  };
  const removeDetailHandler = (e) => {
    console.log(Product);
    console.log(e.currentTarget.id);
    const id = +e.currentTarget.id;
    setProduct((prev) => ({
      ...prev,
      ProductDetail: prev.ProductDetail.filter((d) => d.id !== id),
    }));
  };
  const uploadImageHandler = async (e) => {
    setIsLoading(true);
    alert(e.currentTarget.id);
    const Ref = e.currentTarget.id;
    const type = `Product`;
    const metadata = {
      contentType: "image/jpeg",
    };
    console.log(Front);
    if (Ref === "Front") {
      const metadata = {
        contentType: Front.type,
      };
      const file = Front;
      const fileRef = ref(storage, `${type}/front/${Product.code}${Product.fabric.Fabric_ID}front`);
      const uploadTaskSnapshot = await uploadBytes(fileRef, file, metadata);
      getDownloadURL(uploadTaskSnapshot.ref).then((url) => {
        toast.success("เปลี่ยนรูปเรียบร้อย");
        fetchData();
      });
    }
    if (Ref === "Back") {
      const file = Back;
      const metadata = {
        contentType: Back.type,
      };
      const fileRef = ref(storage, `${type}/back/${Product.code}${Product.fabric.Fabric_ID}back`);
      const uploadTaskSnapshot = await uploadBytes(fileRef, file, metadata);
      getDownloadURL(uploadTaskSnapshot.ref).then((url) => {
        toast.success("เปลี่ยนรูปเรียบร้อย");
        fetchData();
      });
    }
  };
  const labelClass = " text-2xl w-36 text-right pr-3 text-white";
  const infoClass = " text-2xl grow   pr-3 text-white";

  return (
    <div className="p-10 bg-primary-500 font-primary ">
      <div>
        <h1 className="text-4xl text-light-500">ข้อมูลสินค้า</h1>
        <div className="grid w-full grid-cols-2 p-5 mt-3 rounded-lg bg-primary-600">
          {/* code */}
          <div className="flex">
            <h1 className={labelClass}>รหัส :</h1>
            <h1 className={infoClass}>{Product?.code}</h1>
          </div>
          {/* fabric */}
          <div className="flex">
            <h1 className={labelClass}>ผ้า :</h1>
            <h1 className={infoClass}>{Product?.fabric.name}</h1>
          </div>
          {/* design */}
          <div className="flex">
            <h1 className={labelClass}>ชื่อดีไซน์ :</h1>
            {!isNameEdit && <h1 className={infoClass}> {Product?.design?.Design_Name}</h1>}
            {!isNameEdit && (
              <button
                className="px-3 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                onClick={handleEditName}>
                <MdOutlineEdit />
              </button>
            )}
            {isNameEdit && (
              <>
                <input
                  className="px-3 mr-1 text-xl tracking-widest rounded-md outline-none grow bg-primary-400 text-light-500"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className="px-3 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                  onClick={reqChangeDesignName}>
                  <FiSave />
                </button>
                <button
                  className="px-3 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                  onClick={() => {
                    setIsNameEdit(false);
                    setName("");
                  }}>
                  <MdClose />
                </button>
              </>
            )}
          </div>
          {/* price */}
          <div className="flex">
            <h1 className={labelClass}>ราคา :</h1>
            <h1 className={infoClass}>{Product?.price}฿ </h1>
          </div>
          {/* description */}
          <div className="flex">
            <h1 className={labelClass}>คำอธิบายสินค้า :</h1>
            {!isDesEdit && <h2 className={infoClass}>{Product?.Description_Web}</h2>}
            {!isDesEdit && (
              <div>
                <button
                  className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                  onClick={() => {
                    setIsDesEdit(true);
                    setDesBfChange(Product?.Description_Web);
                  }}>
                  <MdOutlineEdit />
                </button>
              </div>
            )}
            {isDesEdit && (
              <>
                <textarea
                  className={`px-3 mr-1 text-xl tracking-widest rounded-md outline-none grow bg-primary-400 text-light-500`}
                  type="text"
                  value={Product?.Description_Web}
                  onChange={updateDes}
                />
                <div className="flex items-center h-full">
                  <button
                    className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                    onClick={() => setIsDesEdit(false)}>
                    <FiSave />
                  </button>
                  <button
                    className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                    onClick={() => {
                      setIsDesEdit(false);
                      setProduct({ ...Product, Description_Web: desBfChange });
                    }}>
                    <MdClose />
                  </button>
                </div>
              </>
            )}
          </div>
          {/* detail */}
          <div className="flex">
            <h1 className={labelClass}>รายละเอียดสินค้า :</h1>
            <div className="grow">
              {Product?.ProductDetail.map((e) => (
                <div key={e.id} className="flex w-full">
                  <h2 className={infoClass}>{e.detail}</h2>
                  <button
                    id={e.id}
                    className="px-3 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                    onClick={removeDetailHandler}>
                    <MdClose />
                  </button>
                </div>
              ))}
              {isAddDetail && (
                <div className="flex items-center w-full h-8">
                  <input
                    className="px-3 mr-1 text-xl tracking-widest rounded-md outline-none grow bg-primary-400 text-light-500"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                  <button
                    className="px-3 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                    onClick={addDetailHandler}>
                    <FiSave />
                  </button>
                  <button
                    className="px-3 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                    onClick={() => {
                      setIsAddDetail(false);
                      setDetail("");
                    }}>
                    <MdClose />
                  </button>
                </div>
              )}
              {!isAddDetail && (
                <div className="px-16 ">
                  <button
                    className="flex items-center justify-center w-full h-8 mt-1 text-xl text-center rounded-full outline outline-1 text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                    onClick={() => {
                      setDetail("");
                      setIsAddDetail(true);
                    }}>
                    <MdAdd />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* FrontBackImage */}
        <div className="border-b-[1px] pt-5 pb-6 w-full grid grid-cols-2 gap-2">
          <div className="flex justify-center w-full">
            <div className="w-fit">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl tracking-widest font-primary text-light-400">รูปด้านหน้า</h1>
                {Product?.Front_img === frontUrl ? (
                  <label className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700">
                    <FiCamera />
                    <input type="file" className="hidden" onChange={onSelectFrontFile} />
                  </label>
                ) : (
                  <div className="flex items-center h-full">
                    <button
                      id="Front"
                      className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                      onClick={uploadImageHandler}>
                      <FiSave />
                    </button>
                    <button
                      className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                      onClick={() => {
                        setFrontUrl(Product?.Front_img);
                      }}>
                      <MdClose />
                    </button>
                  </div>
                )}
              </div>
              <div className="relative w-full mt-1 overflow-hidden rounded-md bg-primary-400 ">
                <div className="relative overflow-hidden rounded-md w-80 h-[430px]">
                  <Image
                    src={frontUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="cursor-pointer"
                    alt={`${Product?.design?.Design_Name}-front`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-fit">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl tracking-widest font-primary text-light-400">รูปด้านหลัง</h1>
                {Product?.Back_img === backUrl ? (
                  <label className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700">
                    <FiCamera />
                    <input type="file" className="hidden" onChange={onSelectBackFile} />
                  </label>
                ) : (
                  <div className="flex items-center h-full">
                    <button
                      id="Back"
                      className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                      onClick={uploadImageHandler}>
                      <FiSave />
                    </button>
                    <button
                      className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                      onClick={() => {
                        setBackUrl(Product?.Back_img);
                      }}>
                      <MdClose />
                    </button>
                  </div>
                )}
              </div>
              <div className="relative w-full mt-1 overflow-hidden rounded-md bg-primary-400 ">
                <div className="relative overflow-hidden rounded-md w-80 h-[430px]">
                  <Image
                    src={backUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="cursor-pointer"
                    alt={`${Product?.design?.Design_Name}-back`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DetailImage */}
        <div className="border-b-[1px] pt-5 pb-6 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl tracking-widest font-primary text-light-400">รูปรายละเอียด</h1>
            <label className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700">
              <FiCamera />
              <input type="file" className="hidden" onChange={addImage} />
            </label>
          </div>
          <div className="flex flex-wrap w-full p-5 mt-1 overflow-auto rounded-md bg-primary-400 scroll-smooth ">
            {image &&
              image.map((e, i) => {
                return (
                  <div key={e.url} className="relative mx-1 my-1 w-52 h-80 shrink-0">
                    <div className="absolute top-0 right-0">
                      <input id={`${e.url}input`} type="checkbox" value="" onClick={choosePhoto} className="w-4 h-4" />
                    </div>
                    <Image
                      id={e.url}
                      key={e.url}
                      src={e.url}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onClick={choosePhoto}
                      className="cursor-pointer"
                      alt={`${Product?.code}-${i}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="border-b-[1px] pt-5 pb-6 flex justify-center w-full">
          <SizeTable
            data={{ size: Product?.design?.Size }}
            SizeList={SizeList}
            Sizedata={Sizedata}
            font={"text-3xl"}
            fontsmall={"text-xl"}
            color={"text-light-400"}
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-3 mb-10 ">
        {/* <button className="p-5 mr-5 bg-light-500" onClick={saveProductHandler}>
          ดูตัวอย่าง
        </button> */}
        <button className="p-5 bg-light-500" onClick={saveProductHandler}>
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default page;
