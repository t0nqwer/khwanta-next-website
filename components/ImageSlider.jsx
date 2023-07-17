"use client";
import React, { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
const ImageSlider = ({ images }) => {
  const [CardWidth, setCardWidth] = useState(0);
  const [SliderWidth, setSliderWidth] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [show, setShow] = useState(3);

  useEffect(() => {
    let Slidercontainer = document.getElementById("slider-container");
    let slider = document.getElementById("slider");
    let card = slider.getElementsByTagName("li");

    let SlidercontainerWidth = Slidercontainer.offsetWidth;
    let cardWidth = SlidercontainerWidth / show;
    const windowwidth = window.innerWidth;
    if (windowwidth >= 1200) setShow(3);
    if (windowwidth < 1200) setShow(2);
    if (windowwidth < 700) setShow(1);
    setSliderWidth(card.length * cardWidth);
    console.log(SlidercontainerWidth, card.length);
    setCardWidth(SlidercontainerWidth / show);
  }, [images]);
  const prev = () => {
    console.log(marginLeft);
    if (marginLeft === 0) return;
    setMarginLeft(marginLeft + CardWidth);
  };
  const next = () => {
    console.log(marginLeft);
    let slider = document.getElementById("slider");

    console.log(
      SliderWidth,
      marginLeft,
      Math.abs(marginLeft - CardWidth) + CardWidth * show
    );
    if (Math.abs(marginLeft) + CardWidth * show === SliderWidth) return;
    setMarginLeft(marginLeft - CardWidth);
  };
  return (
    <div className=" relative w-full grow bg-secound flex justify-center items-center gap-2  ">
      <div className=" w-1/12 left-0 absolute  ">
        <div className="w-full  text-brand">
          <button onClick={prev} className="text-brand">
            <MdNavigateBefore />
          </button>
        </div>
      </div>
      <div id="slider-container" className="  w-full overflow-hidden ">
        <ul
          id="slider"
          className={`flex w-full transition-all duration-700 ease-in-out `}
          style={{ width: `${SliderWidth}px`, marginLeft: `${marginLeft}px` }}
        >
          {images.map((image) => {
            if (image.show)
              return (
                <li
                  id={image.url}
                  className={`w-[${CardWidth}px] p-0 shrink-0`}
                  style={{ width: `${CardWidth}px` }}
                >
                  <div className="">
                    <img
                      src={image.url}
                      className=" object-cover object-center h-[600px] w-full"
                      alt={image.url}
                    />
                  </div>
                </li>
              );
          })}
        </ul>
      </div>
      <div className="w-1/12  right-3 absolute  ">
        <div className="w-full text-brand text-left ">
          <button onClick={next}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
