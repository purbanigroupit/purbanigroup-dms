import { useRouter } from "next/router";
import Layout from "../../components/common/Layout";
import Navbar from "../../components/common/navbar";
import {
  MdLaptopMac,
  MdAccountBalance,
  MdLocalFlorist,
  MdOutlineAttachMoney,
  MdLocalPolice,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { TbPackageExport, TbPigMoney } from "react-icons/tb";
import { SiHelpscout, SiUblockorigin } from "react-icons/si";
import { AiOutlineAudit } from "react-icons/ai";
import { FaMoneyCheckAlt, FaPaperPlane } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";

const departments = [
  {
    name: "sustainability",
    url: "/document/sustainabilityMenu",
    logo: <MdLocalFlorist />,
  },
  { name: "IT", url: "/document/it", logo: <MdLaptopMac /> },
  { name: "HR", url: "/document/hr", logo: <RiAdminFill /> },
  { name: "accounts", url: "/document/accounts", logo: <MdAccountBalance /> },
  { name: "procurement", url: "/document/procurement", logo: <TbPigMoney /> },
  { name: "export", url: "/document/export", logo: <TbPackageExport /> },
  { name: "legal", url: "/document/legal", logo: <SiUblockorigin /> },
  {
    name: "internal audit",
    url: "/document/internal audit",
    logo: <AiOutlineAudit />,
  },
  {
    name: "yarn sales",
    url: "/document/yarn sales",
    logo: <MdOutlineAttachMoney />,
  },
  {
    name: "co-ordination",
    url: "/document/co-ordination",
    logo: <SiHelpscout />,
  },
  { name: "foreign", url: "/document/foreign", logo: <FaPaperPlane /> },
  { name: "local", url: "/document/local", logo: <MdLocalPolice /> },
  { name: "apparel", url: "/document/apparel", logo: <GiLargeDress /> },
  {
    name: "admin",
    url: "/document/admin",
    logo: <MdOutlineAdminPanelSettings />,
  },
  { name: "finance", url: "/document/finance", logo: <FaMoneyCheckAlt /> },
  { name: "commercial", url: "/policy/commercial", logo: <FaMoneyCheckAlt /> },
  { name: "import-banking", url: "/policy/import-banking", logo: <FaMoneyCheckAlt /> },
];

const Document = () => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <Layout>
      <Navbar />
      <div className="max-w-[800px] h-[80vh] w-full mx-auto flex flex-col justify-center">
        <div className="p-6 backdrop-blur-md rounded-3xl border-l-2 border-r-2 border-color_secondary">
          <div className="text-3xl text-white text-center mb-5 font-semibold">
            Documents
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {departments.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleClick(item.url)}
                  className={`flex gap-x-5 items-center justify-between shadow-lg py-2 px-5 group hover:bg-color_brand duration-300  rounded mb-2 bg-white`}
                >
                  <div
                    className={`font-bold text-xl capitalize group-hover:text-color_white duration-300 text-color_secondary`}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`text-3xl ext-color_pink group-hover:text-color_white duration-300 text-color_secondary`}
                  >
                    {item.logo}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Document.auth = true;

export default Document;
