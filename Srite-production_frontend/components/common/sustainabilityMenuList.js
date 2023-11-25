import { MdSystemUpdateAlt } from "react-icons/md";
import { TbFileCertificate } from "react-icons/tb";
import { useRouter } from "next/router";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaRegHandshake, FaWpforms } from "react-icons/fa";

const departments = [
  {
    name: "certification",
    url: "certification",
    logo: <TbFileCertificate />,
  },
  { name: "buyer", url: "buyer", logo: <BsFillPersonVcardFill /> },
  { name: "law and regulation", url: "law", logo: <MdSystemUpdateAlt /> },
  { name: "forms", url: "forms", logo: <FaWpforms /> },
  { name: "agreements", url: "agreements", logo: <FaRegHandshake /> },
];

const SustainabilityMenuList = ({ url }) => {
  const router = useRouter();

  const handleClick = (urlName) => {
    router.push(`/${url}/${urlName}`);
  };

  return (
    <div className="flex justify-center items-center mt-40">
      <div className="max-w-[1200px] w-full">
        <div
          className={`backdrop-filter backdrop-blur-md  py-16 px-20 drop-shadow-lg rounded-lg grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
        >
          {departments.map((item) => {
            return (
              <button
                key={item.name}
                onClick={() => handleClick(item.url)}
                className={`flex items-center justify-between group hover:bg-color_brand duration-300 rounded-xl p-6 border-l-3 border-r-3 border-color_pink hover:border-color_white`}
              >
                <div
                  className={`font-medium text-3xl capitalize group-hover:text-color_white duration-300 text-color_secondary`}
                >
                  {item.name}
                </div>
                <div
                  className={`text-6xl text-color_pink group-hover:text-color_white duration-300 text-color_secondary`}
                >
                  {item.logo}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityMenuList;
