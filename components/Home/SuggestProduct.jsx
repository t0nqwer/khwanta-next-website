import Image from "next/image";

const SuggestProduct = () => {
  return (
    <div className="h-screen bg-primary-500 overflow-hidden relative">
      <div className="w-full h-full grid grid-cols-4 grid-rows-2 ">
        <div className="h-full bg-light-700 w-full"></div>
        <div className="h-full bg-light-800 w-full"></div>
        <div className="h-full bg-light-900 w-full"></div>
        <div className="h-full bg-light-100 w-full"></div>
        <div className="h-full bg-light-200 w-full"></div>
        <div className="h-full bg-light-300 w-full"></div>
        <div className="h-full bg-light-400 w-full"></div>
        <div className="h-full bg-light-500 w-full"></div>
      </div>
    </div>
  );
};

export default SuggestProduct;
