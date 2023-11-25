import { useRouter } from "next/router";
import styles from "../../../styles/knowledge.module.css";
import { useContext } from "react";
import Swal from "sweetalert2";
import Layout from "../../../components/common/Layout";
import Navbar from "../../../components/common/navbar";
import { authContext } from "../../../context/authContext";
import BASIS from "../../../public/assets/Logos/Basis.png";
import ABAP from "../../../public/assets/Logos/ABAP.png";
import FICO from "../../../public/assets/Logos/Fico.png";
import HCM from "../../../public/assets/Logos/HCM.png";
import MM from "../../../public/assets/Logos/mm.png";
import PM from "../../../public/assets/Logos/PM.png";
import SD from "../../../public/assets/Logos/SD.png";
import Image from "next/image";

const OptionCard = ({ number, title, user }) => {
  const router = useRouter();

  const handleButtonClick = (link) => {
    if (
      !user?.isAdmin &&
      !user?.knowledgeAccesses.includes(title.toLowerCase())
    ) {
      Swal.fire({
        icon: "error",
        title: title,
        text: "You are not authorized",
      });
    } else {
      router.push(link);
    }
  };

  return (
    <button
      className="max-w-[249px] h-[236px] w-full p-[20px] relative bg-[#0e0e0e7d] backdrop-blur-md group hover:bg-color_brand duration-300 cursor-pointer rounded-md text-white"
      onClick={() => handleButtonClick(`sap/${title.toLowerCase()}`)}
    >
      <div className="text-5xl absolute text-color_pink group-hover:text-color_white duration-300">
        <Image
          className="w-full"
          alt="logo"
          width={50}
          height={50}
          src={number}
        />
      </div>
      <div className="text-xl font-semibold h-full flex justify-center items-center">
        {title}
      </div>
    </button>
  );
};

const KnowledgeMedia = () => {
  const { state } = useContext(authContext);

  if (!state.user) {
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
    <Layout title="knowledge">
      <div className="flex flex-col items-center h-screen overflow-y-auto">
        <Navbar />
        <div
          className={`${styles.dashboardOptions} max-w-[850px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center my-5 mx-auto`}
        >
          <OptionCard number={BASIS} title="BASIS" user={state.user} />
          <OptionCard number={ABAP} title="ABAP" user={state.user} />
          <OptionCard number={FICO} title="FICO" user={state.user} />
          <OptionCard number={PM} title="PM" user={state.user} />
          <OptionCard number={HCM} title="HCM" user={state.user} />
          <OptionCard number={SD} title="SD" user={state.user} />
          <OptionCard number={MM} title="MM" user={state.user} />
        </div>
      </div>
    </Layout>
  );
};

KnowledgeMedia.auth = true;

export default KnowledgeMedia;
