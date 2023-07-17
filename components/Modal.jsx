"use client";
import useModalState from "@Zustand/ModalState";
import { MdOutlineCheck, MdClose } from "react-icons/md";

const Modal = () => {
  const question = useModalState((state) => state.question);
  const answer = useModalState((state) => state.answer);
  const setAnswer = useModalState((state) => state.setAnswer);
  const setShow = useModalState((state) => state.setShow);
  return (
    <div className="fixed z-40 flex items-center justify-center w-full h-screen p-10 bg-black backdrop-blur-lg bg-opacity-30 max-md:p-0 animate-fadein">
      <div className=" w-[500px] h-[400px] p-10 bg-light-400 rounded-lg flex flex-col justify-center">
        <h1 className="w-full text-2xl text-center">{question}</h1>
        <div className="flex justify-center mt-10 space-x-20">
          <button className="p-3 text-green-500 transition-colors duration-300 rounded-full hover:bg-green-500 hover:text-light-400">
            <MdOutlineCheck
              className="w-10 h-10 "
              onClick={() => {
                console.log("ttt");
                setAnswer(true);
              }}
            />
          </button>
          <button className="p-3 text-red-500 transition-colors duration-300 rounded-full hover:bg-red-500 hover:text-light-400">
            <MdClose className="w-10 h-10" onClick={() => setShow(false)} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
