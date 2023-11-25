import { FaDownload } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { ItLinks } from "../../constants/notice";
import Layout from "../../components/common/Layout";
import Navbar from "../../components/common/navbar";

const pageDetails = () => {
  return (
    <Layout title="Download">
      <Navbar />
      <div>
        <div className="w-full flex items-center justify-center pt-28">
          <div className="grid  grid-cols-1 bg-white rounded-lg w-[800px] py-20 px-10 h-full">
            {ItLinks.map((item, idx) => {
              return (
                <div key={idx} className="flex justify-between flex-row">
                  <div className="text-lg font-bold px-4">{` ${idx + 1}.  ${
                    item.name
                  }`}</div>
                  <div className="flex gap-x-5">
                    <a className="cursor-pointer text-2xl text-color_brand hover:text-white transition-all duration-200">
                      <BsEye />
                    </a>
                    <a
                      className="text-2xl text-color_brand hover:text-white transition-all duration-200"
                      href={item.link}
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
          {/* {`${state.user?.name}, Welcome to Purbani Document Mangement System`} */}
        </div>
      </div>
    </Layout>
  );
};
pageDetails.auth = true;
export default pageDetails;
