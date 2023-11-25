import styles from "../../styles/knowledge.module.css";
import Layout from "../../components/common/Layout";
import Navbar from "../../components/common/navbar";
import SAP from "../../public/assets/Logos/sap.png";
import { useRouter } from "next/router";
import Image from "next/image";

const Knowledge = () => {
  const router = useRouter();

  return (
    <Layout title={"Knowledge"}>
      <div className="flex flex-col items-center h-screen overflow-y-auto">
        <Navbar />
        <div className="w-full flex items-center justify-center mt-10">
          <div
            onClick={() => router.push("/knowledge/sap")}
            className="max-w-[249px] h-[236px] w-full p-[20px] relative bg-[#0e0e0e7d] backdrop-blur-md group hover:bg-color_brand duration-300 cursor-pointer rounded-md text-white"
          >
            <div className="text-5xl absolute text-color_pink group-hover:text-color_white duration-300">
              <Image
                className="w-full"
                alt="logo"
                width={50}
                height={50}
                src={SAP}
              />
            </div>
            <div className="text-xl font-semibold h-full flex justify-center items-center">
              SAP
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Knowledge.auth = true;
export default Knowledge;
