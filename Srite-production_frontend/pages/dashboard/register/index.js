import React, { useState } from "react";
import { baseUrl } from "../../../api/api";
import DashboardLayout from "../../../components/common/DashboardLayout";
import axios from "axios";
import Swal from "sweetalert2";

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

const roles = ["admin", "user"];

const Register = () => {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationFailed(false);
    const form = new FormData();
    form.append("image", formData.image);
    form.append("name", name);
    form.append("employeeId", employeeId);
    form.append("role", role);
    form.append("department", department);
    form.append("email", email);
    form.append("password", password);

    axios
      .post(`${baseUrl}/users/create-user`, form, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((response) => {
        const { data } = response;
        if (data?.statusCode === 201) {
          setLoading(false);
          setRegistrationFailed(false);
          Swal.fire({
            icon: "success",
            title: "Account created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(({ response }) => {
        setLoading(false);
        setRegistrationFailed(true);
      });
  };

  return (
    <DashboardLayout>
      <div className="p-10 max-w-[1250px] w-full h-full backdrop-blur-md border-l-3 border-r-3 border-color_pink rounded-md mt-[100px]">
        <div className="text-white font-semibold text-3xl mb-3">
          Create Account
        </div>
        <div className="w-full flex items-center justify-start">
          <div className="flex flex-col items-center bg-white rounded-lg w-[540px] h-full">
            <div className="p-10 w-full border-b-3 border-t-3 bg-white border-color_pink rounded-md">
              <div className="text-color_pink font-semibold text-3xl italic">
                PURBANI
              </div>
              <form onSubmit={handleRegistration}>
                <div className="w-full ">
                  <div className="w-full mt-2 flex gap-8">
                    <div className="w-1/2">
                      <div className="font-semibold">Name</div>
                      <input
                        className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md "
                        placeholder="Name"
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <div className="font-semibold">Employee ID</div>
                      <input
                        className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md "
                        placeholder="Employee ID"
                        type="text"
                        onChange={(e) => {
                          setEmployeeId(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-between gap-8 mt-6">
                  <div className="w-full">
                    <select
                      className="appearance-none outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md bg-white cursor-pointer capitalize"
                      defaultValue={"Role"}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option defaultValue="Role" disabled hidden>
                        Role
                      </option>
                      {roles.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                    <div className="absolute top-1 left-[180px] flex items-center justify-center w-8 h-full pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 7L10 10L13 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full">
                    <select
                      className="appearance-none outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md bg-white cursor-pointer capitalize"
                      defaultValue={"Department"}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option defaultValue="Department" disabled hidden>
                        Department
                      </option>
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                    <div className="absolute top-1 right-0 flex items-center justify-center w-8 h-full pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 7L10 10L13 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-8">
                  <div className="w-full">
                    <div className="mt-6">
                      <input
                        className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md"
                        placeholder="Email ID"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mt-6">
                      <input
                        className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md mr-2"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative mt-7">
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="img"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="img"
                    className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    <span className="text-sm">Choose Image</span>
                  </label>
                  <div className="my-2 text-black">
                    {formData?.image?.name && (
                      <span>{formData?.image?.name}</span>
                    )}
                  </div>
                </div>
                {registrationFailed == true && (
                  <div className="flex justify-center relative">
                    <div className="absolute top-1 text-rose-500 text-center">
                      Account registration failed.<br></br> Check your
                      credentials and try again.
                    </div>
                  </div>
                )}
                <div className="pt-10 my-5 w-full flex justify-center">
                  {loading ? (
                    <div className="flex justify-center relative mt-[20px] mr-5">
                      <div className="custom-loader"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={` rounded-xl border bg-color_brand px-10 py-2 font-medium text-gray-100 transition-all duration-100`}
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

Register.auth = {
  adminOnly: true,
};

export default Register;
