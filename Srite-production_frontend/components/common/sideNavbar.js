import React from "react";
import { useRouter } from "next/router";
import { sideNavLinks } from "../../constants/navlinks";
import dynamic from "next/dynamic";

const SideNavbar = () => {
  const router = useRouter();

  return (
    <div>
      <div className="lg:w-[280px] xl:w-[300px] 2xl:w-[300px] px-8 py- capitalize  pl-10">
        <div className="flex flex-col gap-1.5 pb-6">
          <div className="text-2xl text-gray-300 font-bold font-sans pb-4 px-6 cursor-default ">
            Navigation
          </div>

          {sideNavLinks.map((item, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer text-base font-medium px-6 py-2 rounded shadow ${
                  item.link === router.pathname
                    ? "bg-gradient-to-tr from-sky-500 to-violet-500 text-white"
                    : "bg-slate-200"
                }   hover:bg-slate-300 hover:scale-105 duration-150 transition-all `}
                onClick={() => {
                  router.push(`${item.link}`);
                }}
              >
                {item?.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SideNavbar), { ssr: false });