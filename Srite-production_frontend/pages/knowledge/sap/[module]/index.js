import { useRouter } from "next/router";
import Layout from "../../../../components/common/Layout";
import Navbar from "../../../../components/common/navbar";
import { BsEye } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { Video } from "cloudinary-react";
import { baseUrl, getHeaders } from "../../../../api/api";
import { authContext } from "../../../../context/authContext";

const Index = () => {
  const router = useRouter();
  const { state } = useContext(authContext);
  const { module } = router.query;
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`/knowledge/get-all-knowledge?department=sap&category=${module}`);
    (async () => {
      try {
        const { data: data } = await axios.get(`${baseUrl}${url}`, {
          headers: getHeaders(),
        });
        setLoading(false);
        setKnowledge(data?.data?.data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [url, module]);

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

  if (
    !state?.user ||
    (!state?.user?.isAdmin &&
      !state?.user?.knowledgeAccesses?.includes(module?.toLowerCase()))
  ) {
    router.push("/unauthorized?message=Authorization Required");
  }

  return (
    <>
      <Layout>
        <Navbar />
        <div className="p-5">
          <div className="mx-auto max-w-[1280px] h-[85vh] overflow-y-auto">
            <div className="w-full flex flex-wrap gap-3 justify-center">
              {knowledge?.map((media, i) => (
                <div key={i} className="max-w-[400px] flex justify-center">
                  <div className="rounded-lg shadow-lg max-w-sm bg-white">
                    {media?.videoLink && (
                      <iframe
                        src={media?.videoLink}
                        width="380"
                        height="200"
                        allowFullScreen
                      />
                    )}
                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2 border-b border-color_secondary pb-2">
                        {media?.title}
                      </h5>
                      {media?.pdfLink && (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={media?.pdfLink}
                          className="w-fit cursor-pointer text-xl text-color_brand hover:text-color_dark transition-all duration-200 border border-color_secondary flex gap-x-2 items-center px-2 rounded"
                        >
                          <span className="text-lg">PDF</span>
                          <BsEye />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

Index.auth = true;

export default Index;
