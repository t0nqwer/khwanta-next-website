"use client";
import React, { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Image from "next/image";
const ImageSlider = ({ images }) => {
  console.log(images);
  const [CardWidth, setCardWidth] = useState(0);
  const [SliderWidth, setSliderWidth] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [show, setShow] = useState(3);

  useEffect(() => {
    const imageLength = images.filter((image) => image.show);
    let Slidercontainer = document.getElementById("slider-container");
    let slider = document.getElementById("slider");
    let card = slider.getElementsByTagName("li");
    const windowwidth = window.innerWidth;
    let show;
    if (windowwidth >= 1200) show = 3;
    if (windowwidth < 1200) show = 2;
    if (windowwidth < 700) show = 1;
    let SlidercontainerWidth = Slidercontainer.offsetWidth;
    let cardWidth = windowwidth / show;
    console.log(imageLength.length, cardWidth, imageLength.length * cardWidth);
    setShow(show);
    setSliderWidth(imageLength.length * cardWidth);
    console.log(SlidercontainerWidth, card.length);
    setCardWidth(windowwidth / show);
  }, [images]);
  const prev = () => {
    if (marginLeft === 0) return;
    setMarginLeft(marginLeft + CardWidth);
  };
  const next = () => {
    console.log(marginLeft);

    console.log(SliderWidth, marginLeft, Math.abs(marginLeft - CardWidth) + CardWidth * show);
    if (Math.abs(marginLeft) + CardWidth * show === SliderWidth) return;
    setMarginLeft(marginLeft - CardWidth);
  };
  const handleScroll = (e) => {
    console.log(e);
  };
  let xDown;
  let yDown;
  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }
  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* right swipe */
        next();
      } else {
        /* left swipe */
        prev();
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
      } else {
        /* up swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
  });
  return (
    <div className="relative flex items-center justify-center w-full gap-2 grow bg-secound">
      <div className="absolute w-1/12 left-2 ">
        <div className="flex items-center justify-center w-full text-4xl text-primary-500">
          <button onClick={prev} className="text-primary-500">
            <MdNavigateBefore />
          </button>
        </div>
      </div>
      <div id="slider-container" className="w-full " onScroll={handleScroll}>
        <ul
          id="slider"
          className={`flex w-full transition-all duration-700 ease-in-out `}
          style={{ width: `${SliderWidth}px`, marginLeft: `${marginLeft}px` }}>
          {images.map((image) => {
            if (image.show)
              return (
                <li id={image.url} className={`w-full h-[600px] p-0 shrink-0`} style={{ width: CardWidth }}>
                  <Image
                    src={image.url}
                    className="object-cover"
                    alt={image.url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </li>
              );
          })}
        </ul>
      </div>
      <div className="absolute w-1/12 right-2 ">
        <div className="flex items-center justify-center w-full text-4xl text-primary-500 ">
          <button onClick={next}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
