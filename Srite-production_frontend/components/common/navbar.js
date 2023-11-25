/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import purbaniLogo from "../../public/assets/Logos/logo-purbani.png";
import dynamic from "next/dynamic";
import { BsFillPersonFill } from "react-icons/bs";
import PopUp from "./PopUp";
import { authContext } from "../../context/authContext";
import Link from "next/link";
import styles from "../../styles/navbar.module.css";
import { BiChevronDown } from "react-icons/bi";
import { useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
const routes = [
  {
    title: "home",
    route: "/",
    icon: <BiChevronDown size={22} />,
    subroutes: [
      { title: "Mission", route: "/#mission" },
      { title: "Vision", route: "/#vision" },
      { title: "Values", route: "/#values" },
    ],
  },
  { title: "notice", route: "/login?redirect=/notice" },
  { title: "policies", route: "/login?redirect=/policy" },
  { title: "knowledge", route: "/login?redirect=/knowledge" },
  { title: "dashboard", route: "/login?redirect=/dashboard" },
];

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(authContext);
  const [url, setUrl] = useState("");
  const [navbar, setNavbar] = useState(false);

  const handleLogout = () => {
    router.push("/login");
    localStorage.clear("x-auth-token");
    dispatch({ type: "LOGOUT" });
  };

  const handleLinkClick = (link) => {
    let shortLink
    if(link === '/'){
      shortLink = '/'
    }else{
      shortLink = link.split("=")[1]
    }
    if (!state.user) {
      window.my_modal_3.showModal();
      setUrl(link);
    } else {
      router.push(shortLink);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbar]);

  const handleBackRoute = () => {
    router.back()
  };
  return (
    <div className="flex justify-center w-full sticky top-0 z-20">
      <div
        className={`flex bg-[#1717172e] backdrop-blur-lg relative rounded-md px-2 items-center justify-between w-3/4 h-20 border-b border-gray-400`}
      >
        {router.pathname != "/" && (
          <div
            onClick={() => handleBackRoute()}
            className="cursor-pointer group absolute top-[110%] left-0 w-[2.5rem] h-[2.5rem] rounded-full bg-white hover:bg-color_brand text-center grid place-items-center duration-300"
          >
            <div className="flex flex-col gap-0 items-center justify-center">
              <span className="text-color_brand group-hover:text-white font-bold">
                <FaLongArrowAltLeft size={28} />
              </span>
              {/* <p className="text-color_brand group-hover:text-white font-bold mt-[-5px]">
                BACK
              </p> */}
            </div>
          </div>
        )}
        <div className={`inline-flex justify-end`}>
          <Image
            src={purbaniLogo}
            width={184}
            height={48}
            alt={"logo"}
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
          />
        </div>
        <div>
          <div className="text-lg flex gap-x-5 lg:gap-x-8 xl:lg:gap-x-10 font-semibold">
            {routes.map(({ title, route, subroutes, icon }) => {
              return title.includes("dashboard") ? (
                state?.user?.isAdmin && (
                  <button
                    key={title}
                    onClick={() => handleLinkClick(route)}
                    className={`${navbar ? "text-color_brand" : "text-color_white"
                      } hover:text-color_brand transition-all duration-500 capitalize`}
                  >
                    {title}
                  </button>
                )
              ) : (
                <div className={styles.dropdown}>
                  <button
                    key={title}
                    onClick={() => handleLinkClick(route)}
                    className={`flex gap-x-2 items-center ${navbar ? "text-color_brand" : "text-color_white"
                      } hover:text-color_brand transition-all duration-500 capitalize`}
                  >
                    <span>{title}</span>
                    {icon && <span>{icon}</span>}
                  </button>
                  {subroutes && (
                    <div className={`${styles.dropdownMenu}`}>
                      {subroutes.map((subroute, index) => (
                        <Link key={index} href={subroute.route}>
                          {subroute.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {state?.user ? (
            <div className="ml-5 flex items-center gap-x-3">
              {state?.user?.profileImage ? (
                <div className="w-[40px] h-[40px] rounded-full">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={state?.user?.profileImage}
                    alt="profile"
                  />
                </div>
              ) : (
                <BsFillPersonFill size={34} className="text-white" />
              )}
              <button
                className="w-20 h-10 inline-flex justify-center items-center text-white px-2 capitalize font-semibold font-sans cursor-pointer  rounded-xl bg-color_brand hover:bg-color_white hover:text-color_brand transition-all duration-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              {router.pathname == "/" && (
                <div className="flex">
                  <button
                    className="w-24 h-11 rounded-xl  text-color_white hover:text-color_brand transition-all duration-100"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </button>
                  <button className="w-24 h-11 rounded-xl bg-color_brand text-color_white hover:bg-color_white hover:text-color_brand transition-all duration-500">
                    Forms
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <PopUp route={{ url, setUrl }} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
