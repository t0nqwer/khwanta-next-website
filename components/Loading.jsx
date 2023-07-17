import React from "react";

const Loading = () => {
  return (
    <div className="fixed w-full h-screen p-10 bg-primary-800 backdrop-blur-lg bg-opacity-70 max-md:p-0 animate-fadein z-100">
      <div className="absolute inline-flex items-end p-10 max-md:hidden">
        <span className="tracking-widest align-baseline text-7xl max-lg:text-5xl font-secondary text-primary-500">
          Loading
        </span>
        <span className="loader "></span>
      </div>
      <div className="flex items-center justify-center w-full h-full bg-light-500">
        <div className="relative">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="absolute top-0 flex items-center justify-center w-full h-full ">
            <p className="text-3xl tracking-widest text-center align-middle  font-secondary text-primary-500">
              KHWANTA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
