"use client";
import { useState, useEffect } from "react";
import useSideBar from "@Zustand/sidebarMenu";
import useIsLoading from "@Zustand/isLoading";
import { MdOutlineEdit, MdClose, MdAdd, MdRefresh } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiCamera } from "react-icons/fi";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { url } from "@utils/URL";
import { useRouter } from "next/navigation";
const links = [
  {
    title: "Back",
    pathname: "/kt-admin/products",
  },
];
const page = ({ params }) => {
  const router = useRouter();
  //STATE
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
  const setMenu = useSideBar((state) => state.setMenu);
  const setIsLoading = useIsLoading((state) => state.setIsLoading);
  //FUNCTION
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/product/${params.id}`);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setProduct(data);
      setIsLoading(false);
      setBackUrl(data.image[1].url);
      setFrontUrl(data.image[0].url);
      const image = data.image.filter((item) => !item.position);
      setImage(data.image.filter((item) => !item.position));
    }
    // const image = data.Product_Cloth_Detail?.map((e) => ({
    //   url: e.Img_Url,
    //   show: false,
    // }));
    // setProduct({ ...data, Description_Web: "", ProductDetail: [] });
  };
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
  const handleEditName = () => {
    setIsNameEdit(true);
    setName(Product?.name);
  };
  const reqChangeDesignName = async (e) => {
    e.preventDefault();
    if (Product?.name === Name) {
      setIsNameEdit(false);
      setName("");
      return;
    }
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
      const response = await fetch(`/api/product/${params.id}/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsNameEdit(false);
        setProduct((prev) => ({ ...prev, name: Name }));
        setName("");
        toast.success("เปลี่ยนชื่อเรียบร้อย");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      const data = await response.json();
      toast.error(data.error);
    }
  };
  const updateDes = (e) => {
    setProduct({
      ...Product,
      description: e.target.value,
    });
  };
  const removeDetailHandler = (e) => {
    console.log(Product);
    console.log(e.currentTarget.id);
    const id = e.currentTarget.id;

    setProduct((prev) => ({
      ...prev,
      detail: prev.detail.filter((d) => d.id !== id),
    }));
  };
  const addDetailHandler = (e) => {
    setProduct((prev) => ({ ...prev, detail: [...prev.detail, { id: Date.now(), detail }] }));
    setIsAddDetail(false);
  };
  const uploadImageHandler = async (e) => {
    const Ref = e.currentTarget.id;
    const type = `Product`;
    if (Ref === "Front") {
      const metadata = {
        contentType: Front.type,
      };
      const file = Front;
      const fileRef = ref(storage, `${type}/front/${Product.code}${Product.fabric.id}front`);
      const uploadTaskSnapshot = await uploadBytes(fileRef, file, metadata);
      getDownloadURL(uploadTaskSnapshot.ref).then((url) => {
        console.log(url);
        toast.success("เปลี่ยนรูปเรียบร้อย");
        setFrontUrl(Product.image[0].url);
      });
    }
    if (Ref === "Back") {
      const file = Back;
      const metadata = {
        contentType: Back.type,
      };
      const fileRef = ref(storage, `${type}/back/${Product.code}${Product.fabric.id}back`);
      const uploadTaskSnapshot = await uploadBytes(fileRef, file, metadata);
      getDownloadURL(uploadTaskSnapshot.ref).then((url) => {
        console.log(url);
        toast.success("เปลี่ยนรูปเรียบร้อย");
        setBackUrl(Product.image[1].url);
      });
    }
  };
  const addImage = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const fileRef = ref(storage, `Product/detail/${Product.code}${Product.fabric.id}-${new Date().getTime()}`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadurl = await getDownloadURL(uploadTaskSnapshot.ref);
    const response = await fetch(`${url}/web/adddetailphoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: downloadurl, id: +Product.id }),
    });
    if (response.ok) {
      console.log(downloadurl);
      setImage((prev) => [...prev, { url: downloadurl, show: false }]);
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
  const saveProductHandler = async () => {
    const imagee = [
      { url: Product.image[0].url, show: true, position: "front" },
      { url: Product.image[1].url, show: true, position: "back" },
      ...image,
    ];
    const data = {
      description: Product?.description,
      detail: Product?.detail,
      image: imagee,
    };
    if (data.detail.length === 0) return toast.error("โปรดกรอกรายละเอียด");
    if (isAddDetail) return toast.error("มีรายละเอียดสินค้าที่คุณยังไม่ได้บันทึก");
    if (isNameEdit) return toast.error("คุณยังไม่ได้บันทึกชื่อ");
    if (isDesEdit) return toast.error("คุณยังไม่ได้บันทึกคำอธิบายสินค้า");
    saveProduct(data);
  };
  const getDetailImage = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/web/getdetailphoto/${Product.id}`);
    if (response.ok) {
      const data = await response.json();
      const newImage = data.map((e) => e.Img_Url);
      console.log(newImage, image);
      let arr1 = newImage.filter((e) => {
        return !image.some((item) => item.url === e);
      });
      let arr2 = image.filter((e) => {
        return !newImage.some((item) => item === e.url);
      });
      const reqimage = Product.image.filter((e) => {
        return !arr2.some((item) => item.url === e.url);
      });
      console.log(arr1, reqimage, arr2);

      if (arr1.length > 0 || arr2.length > 0) {
        const imagee = [...reqimage, ...arr1.map((e) => ({ url: e, show: false }))];
        const response = await fetch(`/api/product/${params.id}/image`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imagee }),
        });
        if (response.ok) {
          toast.success("โหลดรูปเรียบร้อย");
          const data = await response.json();
          console.log(data);
          setImage(data.image.filter((item) => !item.position));
          setIsLoading(false);
          return;
        } else {
          toast.error("ไม่สามารถโหลดรูปได้");
          setIsLoading(false);
          return;
        }
      }
      toast.error("ไม่สามารถโหลดรูปได้ หรือ ไม่มีรูปภาพใหม่");
      setIsLoading(false);
    } else {
      toast.error("ไม่สามารถโหลดรูปได้ หรือ ไม่มีรูปภาพใหม่");
      setIsLoading(false);
    }
  };

  const saveProduct = async (data) => {
    setIsLoading(true);
    console.log(data);
    const response = await fetch(`/api/product/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setIsLoading(false);
      toast.success("แก้ไขสินค้าเรียบร้อย");
      router.push("/kt-admin/products");
    } else {
      toast.error("ไม่สามารถแก้ไขสินค้าได้");
      setIsLoading(false);
    }
  };
  //useEFFECT
  useEffect(() => {
    fetchData();
    setMenu(links);
  }, []);
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

  const labelClass = " text-2xl w-36 text-right pr-3 text-white";
  const infoClass = " text-2xl grow   pr-3 text-white";
  const inputcss = "w-full bg-primary-400 p-5 rounded-md text-light-500 outline-none text-lg font-semibold";
  return (
    <div className="p-10 bg-light-400 font-primary ">
      <div>
        <h1 className="text-4xl text-primary-500">ข้อมูลสินค้า</h1>
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
            {!isNameEdit && <h1 className={infoClass}> {Product?.name}</h1>}
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
            {!isDesEdit && <h2 className={infoClass}>{Product?.description}</h2>}
            {!isDesEdit && (
              <div>
                <button
                  className="px-3 py-2 text-xl rounded-full text-light-500 hover:bg-light-500 hover:text-primary-500 active:bg-light-700 active:text-primary-700"
                  onClick={() => {
                    setIsDesEdit(true);
                    setDesBfChange(Product?.description);
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
                  value={Product?.description}
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
                      setProduct({ ...Product, description: desBfChange });
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
              {Product?.detail?.map((e) => (
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
        <div className="border-b-[1px] border-t-[1px] border-primary-500 mt-5 pt-5 pb-6 w-full grid grid-cols-2 gap-2">
          <div className="flex justify-center w-full">
            <div className="w-fit">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl tracking-widest font-primary text-primary-400">รูปด้านหน้า</h1>
                {Product?.image[0].url === frontUrl ? (
                  <label className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700">
                    <FiCamera />
                    <input type="file" className="hidden" onChange={onSelectFrontFile} />
                  </label>
                ) : (
                  <div className="flex items-center h-full">
                    <button
                      id="Front"
                      className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700"
                      onClick={uploadImageHandler}>
                      <FiSave />
                    </button>
                    <button
                      className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700"
                      onClick={() => {
                        setFrontUrl(Product?.image[0].url);
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
                    alt={`${Product?.name}-front`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-fit">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl tracking-widest font-primary text-primary-400">รูปด้านหลัง</h1>
                {Product?.image[1].url === backUrl ? (
                  <label className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700">
                    <FiCamera />
                    <input type="file" className="hidden" onChange={onSelectBackFile} />
                  </label>
                ) : (
                  <div className="flex items-center h-full">
                    <button
                      id="Back"
                      className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700"
                      onClick={uploadImageHandler}>
                      <FiSave />
                    </button>
                    <button
                      className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700"
                      onClick={() => {
                        setBackUrl(Product?.image[1].url);
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
                    alt={`${Product?.name}-back`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DetailImage */}
        <div className="border-b-[1px] border-primary-500 pt-5 pb-6 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl tracking-widest font-primary text-primary-400">รูปรายละเอียด</h1>
            <div className="flex">
              <label className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700">
                <FiCamera />
                <input type="file" className="hidden" onChange={addImage} />
              </label>
              <button
                className="px-3 py-2 text-xl rounded-full text-primary-500 hover:bg-primary-500 hover:text-light-500 active:bg-primary-700 active:text-primary-700"
                onClick={getDetailImage}>
                <MdRefresh />
                {/* <input type="file" className="hidden" onChange={getDetailImage} /> */}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap w-full p-5 mt-1 overflow-auto rounded-md bg-primary-400 scroll-smooth ">
            {image &&
              image.map((e, i) => {
                return (
                  <div key={e.url} className="relative mx-1 my-1 w-52 h-80 shrink-0">
                    <div className="absolute top-0 right-0">
                      <input
                        id={`${e.url}input`}
                        type="checkbox"
                        defaultChecked={e.show}
                        value=""
                        onClick={choosePhoto}
                        className="w-4 h-4"
                      />
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
      </div>
      <div className="flex justify-end w-full mt-3 mb-10 ">
        <button
          className="p-4 text-2xl rounded-lg outline outline-primary-500 bg-primary-500 text-light-500 hover:bg-transparent hover:outline-2 border-primary-500 hover:text-primary-500"
          onClick={saveProductHandler}>
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default page;
