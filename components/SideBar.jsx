"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import Link from "next/link";
import useSideBar from "@Zustand/sidebarMenu";
const SideBar = () => {
  const pathname = usePathname();
  const menu = useSideBar((state) => state.menu);

  return (
    <div className="fixed h-screen w-60 bg-light-500 grow-0 font-primary ">
      <div className="flex flex-col items-center justify-between h-full py-5 ">
        <div className="mt-3">
          <Link href={`/kt-admin`}>
            <Image src="/logo-s-black.png" className="" width={176} height={64} />
          </Link>
        </div>
        <div className="flex flex-col justify-center w-full h-full px-10 space-y-4 text-2xl font-normal">
          {menu.map((link, index) => {
            if (`${link.pathname}` === pathname) {
              return (
                <div key={link.pathname}>
                  <Link href={`${link.pathname}`} className="nav-active">
                    {link.title}
                  </Link>
                </div>
              );
            }
            return (
              <div key={link.pathname}>
                <Link key={link.pathname} href={`${link.pathname}`} className="nav">
                  {link.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
