import { FaDownload } from "react-icons/fa";
import Layout from "../components/common/Layout";
import Navbar from "../components/common/navbar";
import { useContext, useEffect, useState } from "react";
import { baseUrl, getHeaders } from "../api/api";
import axios from "axios";
import { BsEye } from "react-icons/bs";
import { authContext } from "../context/authContext";

const Notice = () => {
  const { state } = useContext(authContext);
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <Layout title="Notice">
      <div className="flex flex-col justify-between items-center overflow-y-auto">
        <Navbar />
        <div className="w-full flex items-center justify-center mt-10">
          <div className="grid xs-grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {notice
              ?.slice(0, 6)
              ?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="max-w-[280px] w-full flex flex-col bg-black/50 rounded-lg pt-2 px-10 h-full"
                  >
                    <div className="text-color_brand text-5xl font-bold py-2 ">
                      {idx + 1}
                    </div>
                    <div className="text-white text-xl font-bold pt-4 min-h-[130px]">
                      {item.title}
                    </div>
                    <div className="w-full inline-flex justify-end py-6 gap-x-3">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={item?.readableLink}
                        className="cursor-pointer text-2xl text-color_brand hover:text-white transition-all duration-200"
                      >
                        <BsEye />
                      </a>
                      <a
                        href={item?.downloadableLink}
                        download
                        className="text-2xl text-color_brand hover:text-white transition-all duration-200"
                      >
                        <FaDownload />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="text-white text-center pt-6 text-xl capitalize">
          {`${state?.user?.name}, Welcome to Purbani Document Management System`}
        </div>
      </div>
    </Layout>
  );
};

Notice.auth = true;
export default Notice;
