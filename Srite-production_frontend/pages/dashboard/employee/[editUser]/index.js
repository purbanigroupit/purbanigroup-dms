import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/common/DashboardLayout";
import axios from "axios";
import { baseUrl, getHeaders } from "../../../../api/api";
import Swal from "sweetalert2";
import { AiOutlineCloseCircle } from "react-icons/ai";

const departments = [
  "export",
  "legal",
  "accounts",
  "IT",
  "HR",
  "internal audit",
  "yarn sales",
  "co-ordination",
  "foreign",
  "local",
  "apparel",
  "admin",
  "finance",
  "sustainability",
  "commercial",
  "import-banking",
];
const allRole = ["admin", "user"];
const knowledge = ["basis", "abap", "fico", "pm", "hcm", "sd", "mm"];

const EditUser = () => {
  const router = useRouter();
  const email = router.query.editUser;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data: data } = await axios.get(
          `${baseUrl}/users/get-user/${email}`,
          { headers: getHeaders() }
        );
        setUser({ ...data.data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [email]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const newUser = {};
    delete user.email;
    delete user.employeeId;
    newUser = { ...user };

    setLoading(true);
    try {
      await axios.put(
        `${baseUrl}/users/update-one-user/${user?._id}`,
        newUser,
        {
          headers: getHeaders(),
        }
      );

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard/employee");
    } catch ({ response }) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response?.data?.message,
      });
    }
  };

  const handleSelectKnowledgeAccess = (knw) => {
    if (user?.knowledgeAccesses.includes(knw)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${knw.toUpperCase()} is already selected`,
      });
    }
    setUser({
      ...user,
      knowledgeAccesses: [...user.knowledgeAccesses, knw],
    });
  };

  const handleRemoveKnowledgeAccess = async (knw) => {
    const filteredKnowledge = user?.knowledgeAccesses.filter(
      (item) => item !== knw
    );
    setUser({ ...user, knowledgeAccesses: filteredKnowledge });
  };

  if (loading) {
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
    <DashboardLayout>
      <div className="p-12 bg-white text-black rounded-lg border-l-3 border-r-3 border-color_pink max-w-[800px] w-full">
        <form onSubmit={handleUpdateUser}>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col">
              <label className="font-semibold cursor-pointer" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user?.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-color_secondary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="font-semibold cursor-pointer"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="*********"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full bg-white rounded border border-gray-300 focus:border-color_secondary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="font-semibold cursor-pointer"
                htmlFor="department"
              >
                Department
              </label>
              <select
                onChange={(e) =>
                  setUser({ ...user, department: e.target.value })
                }
                defaultValue={user?.department}
                name="department"
                className="w-full bg-white rounded border border-gray-300 focus:border-color_secondary text-base outline-none text-gray-700 p-2 leading-8 transition-colors uppercase duration-200 ease-in-out"
              >
                <option defaultChecked value={user?.department}>
                  {user?.department}
                </option>
                {departments?.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold cursor-pointer" htmlFor="role">
                Role
              </label>
              <select
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                id="role"
                name="role"
                className="w-full bg-white rounded border border-gray-300 focus:border-color_secondary text-base outline-none text-gray-700 p-2 leading-8 transition-colors uppercase duration-200 ease-in-out"
              >
                <option defaultChecked value={user?.role}>
                  {user?.role}
                </option>
                {allRole?.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                className="font-semibold cursor-pointer"
                htmlFor="department"
              >
                Knowledge Access
              </label>
              <select
                onChange={(e) => handleSelectKnowledgeAccess(e.target.value)}
                name="department"
                defaultValue="Select an option"
                className="w-full bg-white rounded border border-gray-300 focus:border-color_secondary text-base outline-none text-gray-700 p-2 leading-8 transition-colors uppercase duration-200 ease-in-out"
              >
                <option defaultValue="Select an option" disabled defaultChecked>
                  Select an option
                </option>
                {knowledge.map((knowledge, index) => (
                  <option key={index} value={knowledge}>
                    {knowledge}
                  </option>
                ))}
              </select>
            </div>
            {user?.knowledgeAccesses?.length > 0 && (
              <div>
                <h4 className="font-semibold">Accessed</h4>
                <ul className="flex gap-x-2 py-2 max-w-[400px] w-full flex-wrap">
                  {user?.knowledgeAccesses?.map((knw, index) => (
                    <li
                      className="uppercase flex items-center justify-center gap-x-0.5"
                      key={index}
                    >
                      {knw}{" "}
                      <AiOutlineCloseCircle
                        onClick={() => handleRemoveKnowledgeAccess(knw)}
                        className="text-red-500 cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mx-auto w-full block mt-5 px-8 py-2 rounded bg-color_brand text-color_white hover:bg-color_white hover:text-color_brand transition-all duration-500 uppercase"
          >
            Update
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditUser;
