import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { baseUrl, getHeaders } from "../../../api/api";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Employees = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const filteredUsers = users.filter((user) => user.role !== "super_admin");

  useEffect(() => {
    (async () => {
      try {
        const { data: data } = await axios.get(
          `${baseUrl}/users/get-all-user`,
          { headers: getHeaders() }
        );
        setLoading(false);
        setUsers(data.data.data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [refetch]);

  const handleDeleteUser = async (id) => {
    try {
      const { data: data } = await axios.delete(
        `${baseUrl}/users/delete-one-user/${id}`,
        { headers: getHeaders() }
      );
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
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
      <div className="mt-2 bg-white text-black border-l-3 border-r-3 border-color_pink rounded-lg p-10 max-w-[1280px] w-full max-h-[85vh] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-color_brand">No</th>
              <th className="border border-color_brand text-left pl-2">Name</th>
              <th className="border border-color_brand text-left pl-2">Email</th>
              <th className="border border-color_brand text-left pl-2">Role</th>
              <th className="border border-color_brand text-left px-2">
                Knowledge
              </th>
              <th className="border border-color_brand text-left pl-2">Edit</th>
              <th className="border border-color_brand text-left pl-2">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers &&
              filteredUsers.map((user, index) => (
                <tr
                  key={user?._id}
                  className="hover border border-t-0 border-color_brand"
                >
                  <th className="p-2 text-color_pink border border-t-0 border-color_brand ">
                    {index + 1}.
                  </th>
                  <td className="p-2 border border-color_brand border-t-0">
                    {user?.name}
                  </td>
                  <td className="p-2 border border-color_brand border-t-0">
                    {user?.email}
                  </td>
                  <td className="p-2 border border-color_brand border-t-0 capitalize">
                    {user?.role}
                  </td>
                  <td className="p-2 border border-color_brand border-t-0">
                    {user.knowledgeAccesses.length > 0 ? "Yes" : "No"}
                  </td>

                  <td
                    onClick={() => {
                      router.push(`/dashboard/employee/${user?.email}`);
                    }}
                    className="cursor-pointer p-2 border border-color_brand border-t-0"
                  >
                    <div className="flex items-center gap-x-2 hover:text-blue-500">
                      <AiFillEdit /> <span>Edit</span>
                    </div>
                  </td>
                  <td
                    onClick={() => handleDeleteUser(user?._id)}
                    className="cursor-pointer p-2 hover:text-red-500"
                  >
                    <div className="flex items-center gap-x-2">
                      <AiOutlineDelete /> <span>Delete</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

Employees.auth = {
  adminOnly: true,
};
export default Employees;
