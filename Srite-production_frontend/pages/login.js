import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/common/Layout";
import Navbar from "../components/common/navbar";
import Image from "next/image";
import purbaniPurbani from "../public/assets/Logos/logo-purbani.png";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SingUpPopup from "../components/common/SingUpPopup";
import { baseUrl } from "../api/api";
import axios from "axios";
import Swal from "sweetalert2";
import { authContext } from "../context/authContext";

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  
  const { redirect } = router.query;
  useEffect(() => {
    if (state.user) {
      router.push(redirect || "/");
    }
    setLoading(false);
  }, [router, redirect, state.user]);

  // Login API
  const handleLogin = async () => {
    try {
      setSubmitLoading(true);
      const { data: data } = await axios.post(`${baseUrl}/auth/login`, {
        employeeId: employeeId,
        password: password,
      });

      setSubmitLoading(false);
      localStorage.setItem("x-auth-token", data.data.accessToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.data,
          loading: false,
        },
      });
      router.push(redirect || "/");
    } catch ({ response }) {
      setSubmitLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.message,
      });
    }
  };

  if (loading || submitLoading) {
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

  if (state.user) {
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
    <Layout title="Login">
      <Navbar />
      <div>
        <div className="w-full flex items-center justify-center pt-28">
          <div className="flex flex-col items-center border-b-3 border-t-3 bg-white border-color_pink rounded-lg w-[440px] h-full">
            <div className="pt-8 flex flex-col items-center">
              <Image
                src={purbaniPurbani}
                width={184}
                height={48}
                alt={"logo"}
              />
              <div className="text-xl font-semibold">
                Welcome to Purbani Group
              </div>
            </div>
            <div className="pt-8 px-10 w-full ">
              <form>
                <div>
                  <div className="font-semibold">Employee ID</div>
                  <div className="mt-2">
                    <input
                      className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md "
                      placeholder="Name"
                      type="text"
                      onChange={(e) => {
                        setEmployeeId(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-semibold pt-5">Password</div>
                  <div>
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
                <div className="text-center py-2 text-rose-500 font-medium h-10">
                  <span
                    className={`${
                      incorrectCredentials === false ? "invisible" : "visible"
                    } transition-all duration-300`}
                  >
                    Your employee ID or password is incorrect
                  </span>
                </div>
                <div className="w-full flex justify-center">
                  <div className="py-8 w-full flex justify-center">
                    {submitLoading ? (
                      <div className="flex justify-center relative mt-[10px]">
                        <div className="custom-loader"></div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className={`rounded-xl border bg-color_brand px-4 py-2 font-medium text-gray-100 hover:bg-white hover:text-black transition-all duration-100 mb-[20px] cursor-pointer`}
                        disabled={!employeeId && !password}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogin();
                        }}
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </form>
              <p className="text-center pb-5">
                {`Don't have account? `}{" "}
                <button onClick={() => window.SignUPModal.showModal()}>
                  <a className="text-color_pink">Sign Up</a>
                </button>
              </p>
            </div>
          </div>
        </div>
        <SingUpPopup />
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });
