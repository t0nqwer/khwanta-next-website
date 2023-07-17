"use client";
import { dir } from "i18next";
import { languages } from "../i18n/setting";
import localFont from "next/font/local";
import { Tenor_Sans } from "next/font/google";
import useMenuactive from "@Zustand/activeMenu";
import useIsLoading from "@Zustand/isLoading";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Loading from "@components/Loading";
import NavBar from "@components/NavBar";
import "./globals.css";
import Menu from "@components/Menu";
import { Footer } from "./components/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
const ThaiSansNeue = localFont({
  src: "../../public/OpenType/ThaiSansNeue-Regular.otf",
  variable: "--ThaiSansNeue",
});
const Tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font_Tenor",
});

export default function RootLayout({ children, params: { lng } }) {
  const IsActive = useMenuactive((state) => state.IsActive);
  const pathname = usePathname();
  const isLoading = useIsLoading((state) => state.isLoading);

  return (
    <html lang={lng} dir={dir(lng)} className={`${ThaiSansNeue.variable} ${Tenor.variable}`}>
      <head />
      <body className="">
        <Toaster />
        {isLoading && <Loading />}
        <NavBar lng={lng} />
        {IsActive && <Menu />}
        <div>{children}</div>
      </body>
    </html>
  );
}
