import DashboardLayout from "../../../components/common/DashboardLayout";
import DepartmentList from "../../../components/common/DepartmentList";
import UploadForm from "../../../components/common/UploadForm";
import { useEffect, useState } from "react";
import {
  MdLaptopMac,
  MdAccountBalance,
  MdLocalPolice,
  MdOutlineAttachMoney,
  MdLocalFlorist,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { TbPackageExport, TbPigMoney } from "react-icons/tb";
import { SiUblockorigin, SiHelpscout } from "react-icons/si";
import { AiOutlineAudit, AiOutlineDelete } from "react-icons/ai";
import { FaPaperPlane, FaMoneyCheckAlt } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import axios from "axios";
import { baseUrl, getHeaders } from "../../../api/api";
import Swal from "sweetalert2";

const departments = [
  { name: "sustainability", logo: <MdLocalFlorist /> },
  { name: "it", logo: <MdLaptopMac /> },
  { name: "hr", logo: <RiAdminFill /> },
  { name: "accounts", logo: <MdAccountBalance /> },
  { name: "procurement", logo: <TbPigMoney /> },
  { name: "export", logo: <TbPackageExport /> },
  { name: "legal", logo: <SiUblockorigin /> },
  { name: "internal audit", logo: <AiOutlineAudit /> },
  { name: "yarn sales", logo: <MdOutlineAttachMoney /> },
  { name: "co-ordination", logo: <SiHelpscout /> },
  { name: "foreign", logo: <FaPaperPlane /> },
  { name: "local", logo: <MdLocalPolice /> },
  { name: "apparel", logo: <GiLargeDress /> },
  { name: "admin", logo: <MdOutlineAdminPanelSettings /> },
  { name: "finance", logo: <FaMoneyCheckAlt /> },
  { name: "commercial", logo: <FaMoneyCheckAlt /> },
  { name: "import-banking", logo: <FaMoneyCheckAlt /> },
];

const Department = () => {
  const [department, setDepartment] = useState("sustainability");
  const [title, setTitle] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [allPdf, setAllPdf] = useState([]);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: data } = await axios.get(
          `${baseUrl}/document/get-all-document?department=${department}`,
          { headers: getHeaders() }
        );
        setAllPdf(data.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, [department, refetch]);

  const handleDeletePdf = async (id) => {
    try {
      await axios.delete(`${baseUrl}/document/delete-one-document/${id}`, {
        headers: getHeaders(),
      });
      Swal.fire({
        icon: "success",
        title: "Deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setRefetch(!refetch);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Document">
        <div className="w-full flex h-[80vh] flex-col justify-center items-center">
          <div className="flex justify-center relative">
            <div className="custom-loader"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Document">
      <div className="p-10 max-w-[1250px] w-full h-full backdrop-blur-md rounded-md border-l-3 border-r-3 border-color_pink">
        <div className="text-white font-semibold text-3xl mb-3">Department</div>
        <div className="flex flex-col h-full justify-around">
          <DepartmentList
            departments={departments}
            setDepartment={setDepartment}
            department={department}
            setSubDepartment={setSubDepartment}
          />
          <div className="h-full flex flex-col gap-x-2 justify-between">
            <UploadForm
              url="/document/upload-document-pdf"
              formData={formData}
              setFormData={setFormData}
              department={department}
              setDepartment={setDepartment}
              title={title}
              setTitle={setTitle}
              subDepartment={subDepartment}
              setSubDepartment={setSubDepartment}
              loading={loading}
              setLoading={setLoading}
              setRefetch={setRefetch}
              refetch={refetch}
            />
            <div className="flex-1">
              <div className="w-full flex flex-col items-center bg- rounded-lg shadow-lg py-10 border-b-3 border-t-3 bg-white border-color_pink mt-3">
                <div className="text-xl flex justify-start border-color_pink border-b w-full px-10 font-semibold text-color_pink uppercase text-left pb-1">
                  {department} - List
                </div>
                <div className="pt-5 text-black overflow-y-auto max-h-[450px] w-full">
                  {allPdf?.map((list, i) => (
                    <div key={list?._id} className="border-b p-3">
                      <div className="mx-auto w-4/5 flex justify-between">
                        <div className="flex gap-x-2">
                          <div className="mr-2 text-color_pink">{i + 1}.</div>
                          <div>{list?.title}</div>
                        </div>
                        <div className="hover:text-red-600 text-2xl">
                          <label
                            onClick={() => handleDeletePdf(list?._id)}
                            className="cursor-pointer"
                          >
                            <AiOutlineDelete />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

Department.auth = {
  adminOnly: true,
};
export default Department;
