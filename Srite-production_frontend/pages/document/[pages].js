import { FaDownload } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import Layout from "../../components/common/Layout";
import Navbar from "../../components/common/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { baseUrl, getHeaders } from "../../api/api";
import axios from "axios";
import { AiFillFilePdf } from "react-icons/ai";
import { authContext } from "../../context/authContext";

const PageDetails = () => {
  const router = useRouter();
  const { pages } = router.query;
  const { state } = useContext(authContext);
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(true);

  let url = `/document/get-all-document?department`;
  if (
    pages === "certification" ||
    pages === "buyer" ||
    pages === "forms" ||
    pages === "agreements"
  ) {
    url = `/document/get-all-document?subDepartment`;
  } else if (pages === "law") {
    url = `/document/get-all-document?searchTerm`;
  }

  useEffect(() => {
    (async () => {
      try {
        const { data: data } = await axios.get(`${baseUrl}${url}=${pages}`, {
          headers: getHeaders(),
        });
        setLoading(false);
        setDocument(data?.data?.data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [pages, url]);

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
    <Layout title={pages.toUpperCase()}>
      <div className="h-screen overflow-y-auto">
        <Navbar />
        {document?.length && (
          <div className="w-full flex items-center justify-center pt-28">
            <div className="grid grid-cols-1 bg-white rounded-lg w-[800px] p-10 h-full">
              {document?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-between flex-row mb-2 border-b border-color_secondary rounded p-2"
                  >
                    <div className="text-lg font-bold px-4 flex gap-x-1 items-center">
                      <span>
                        <AiFillFilePdf className="text-color_brand" />
                      </span>{" "}
                      {item.title}
                    </div>
                    <div className="flex gap-x-5">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={item?.readableLink}
                        className="cursor-pointer text-2xl text-color_brand hover:text-black transition-all duration-200"
                      >
                        <BsEye />
                      </a>
                      <a
                        className="text-2xl text-color_brand hover:text-black transition-all duration-200"
                        href={item?.downloadableLink}
                        download
                      >
                        <FaDownload />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="text-white text-center pt-6 text-xl capitalize">
          {`${state?.user?.name}, Welcome to Purbani Document Management System`}
        </div>
      </div>
    </Layout>
  );
};

PageDetails.auth = true;
export default PageDetails;
