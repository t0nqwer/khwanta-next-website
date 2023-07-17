"use client";
import Menu from "@components/Menu";
import SideBar from "@components/SideBar";
import { Toaster } from "react-hot-toast";
import Loading from "@components/Loading";
import useIsLoading from "@Zustand/isLoading";
import localFont from "next/font/local";
import { Tenor_Sans } from "next/font/google";
import "./globals.css";
import Modal from "@components/Modal";
import useModalState from "@Zustand/ModalState";
const ThaiSansNeue = localFont({
  src: "../../public/OpenType/ThaiSansNeue-Regular.otf",
  variable: "--ThaiSansNeue",
});
const Tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font_Tenor",
});

const layout = ({ children }) => {
  const isLoading = useIsLoading((state) => state.isLoading);
  const show = useModalState((state) => state.show);
  return (
    <html className={`${ThaiSansNeue.variable} ${Tenor.variable}`}>
      <head />
      <body className="w-screen overflow-x-hidden overflow-y-scroll ">
        {isLoading && <Loading />}
        <Toaster />
        {show && <Modal />}
        <div className="flex overflow-hidden">
          <div className="shadow-xl w-60 shrink-0">
            <SideBar />
          </div>
          <div className="w-full overflow-hidden bg-light-300">{children}</div>
        </div>
      </body>
    </html>
  );
};
export default layout;
