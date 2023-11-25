import purbaniLogo from "../../public/assets/Logos/logo-purbani.png";
import Image from "next/image";
import DownloadPopUp from "../common/downloadPopUp";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import { authContext } from "../../context/authContext";
import Layout from "../common/Layout";
import { baseUrl, getHeaders } from "../../api/api";
import axios from "axios";
import { CgFileDocument } from "react-icons/cg";
import Marquee from "react-fast-marquee";

const DownloadCard = () => {
  const router = useRouter();
  const { state } = useContext(authContext);
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");

  const handleLinkClick = (link) => {
    if (!state.user) {
      window.DownloadModal.showModal();
      setUrl(link);
    } else {
      router.push(link);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: data } = await axios.get(
          `${baseUrl}/notice/get-all-notice?sortOrder=asc`,
          { headers: getHeaders() }
        );
        setLoading(false);
        setNotice(data.data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Layout title="Loading">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="flex justify-center relative">
            <div className="custom-loader"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <div className="flex flex-col w-full items-center justify-center mt-16 2xl:mt-28 font-extrabold px-60 p-10 pb-10">
        <div className="flex flex-col justify-between py-6 h-[379px] w-[681px] backdrop-blur-md bg-gray-100/10 rounded-3xl items-center">
          <div>
            <Image src={purbaniLogo} alt="Logo" width={184} height={48} />
          </div>
          <div className="text-2xl text-white font-extrabold w-64 text-center">
            OUR PURPOSE IS TO BUILD A
            <div>
              <Typewriter
                options={{
                  strings: [
                    "BETTER FUTURE TOGETHER",
                    '<span style="color:rgba(163, 35, 141, 1);">SUSTAINABLE FUTURE TOGETHER</span>',
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => handleLinkClick("/login?redirect=/document")}
              className="w-72 h-12 rounded-xl bg-color_brand text-color_white hover:bg-color_white hover:text-color_brand transition-all duration-500"
            >
              Download Documents
            </button>
          </div>
        </div>
        {state?.user ? (
          <a
            className="mt-3 mb-28"
            target="_blank"
            rel="noreferrer"
            href={notice[0]?.readableLink}
          >
            <div className="cursor-pointer backdrop-blur-md bg-gray-100/10 rounded-3xl text-white w-[680px] py-1 px-4">
              <Marquee speed={80}>
                <p>
                  <span className="flex justify-center items-center text-xs">
                    <span className="mr-2 text-color_brand">
                      <CgFileDocument />
                    </span>
                    {notice[0]?.title}
                    <span className="ml-2 text-color_brand">
                      <CgFileDocument />
                    </span>
                  </span>
                </p>
              </Marquee>
            </div>
          </a>
        ) : null}
        <DownloadPopUp route={{ url, setUrl }} />
      </div>
    </div>
  );
};

export default DownloadCard;
// export default dynamic(() => Promise.resolve(DownloadCard), { ssr: false });
