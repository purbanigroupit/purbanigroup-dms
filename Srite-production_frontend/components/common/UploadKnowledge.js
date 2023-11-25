import { baseUrl, getHeaders } from "../../api/api";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillFilePdf } from "react-icons/ai";
import { FcVlc } from "react-icons/fc";
import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/lib/progress-bar.css";
import { useState } from "react";

const UploadKnowledge = ({
  url,
  formData,
  setFormData,
  department,
  title,
  setTitle,
  subDepartment,
  setSubDepartment,
  loading,
  setLoading,
  setRefetch,
  refetch,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handlePdf = (e) => {
    const file = e.target.files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      pdfFile: file,
    }));
  };
  const handleVideo = (e) => {
    const file = e.target.files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      videoFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.videoFile?.size >= 100000000) {
      return Swal.fire({
        icon: "error",
        title: "Cloudinary Upgrade to Pro Plan",
        text: "You cannot upload video file more than 100 mb",
      });
    }

    setLoading(true);
    const doc = {
      title: title,
      department: department,
      category: subDepartment,
    };

    const pdfForm = new FormData();
    const videoForm = new FormData();

    if (formData.pdfFile) {
      try {
        pdfForm.append("file", formData.pdfFile);
        pdfForm.append("upload_preset", "b97hu80x");
        pdfForm.append("cloud_name", "dfhzvfeh4");
        pdfForm.append("folder", "knowledge/pdf");
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dfhzvfeh4/upload",
          pdfForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        doc.pdfLink = data.secure_url;
        doc.cloudinaryPdfId = data.public_id;
      } catch (error) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }

    if (formData.videoFile) {
      try {
        videoForm.append("file", formData.videoFile);
        videoForm.append("upload_preset", "b97hu80x");
        videoForm.append("cloud_name", "dfhzvfeh4");
        videoForm.append("folder", "knowledge/video");
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dfhzvfeh4/upload",
          videoForm,
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            },
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        doc.videoLink = data.secure_url;
        doc.cloudinaryVideoId = data.public_id;
      } catch (error) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }

    try {
      const { data } = await axios.post(`${baseUrl}${url}`, doc, {
        headers: getHeaders(),
      });

      setLoading(false);
      if (data.statusCode === 201) {
        setRefetch(!refetch);
        return Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg- rounded-lg shadow-lg py-10 border-b-3 border-t-3 bg-white border-color_pink mt-3">
      <div className="text-xl flex justify-start border-color_pink border-b w-full px-10 font-semibold text-color_pink uppercase text-left pb-1">
        {department}
      </div>
      <div className="px-10 w-full ">
        <form onSubmit={handleSubmit}>
          <div className="w-full ">
            <div className="my-5 py-1">
              <div className="font-semibold text-black">Document Title</div>
              <input
                className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md focus:border-color_secondary"
                placeholder="Title"
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {
              <div className="relative">
                <div className="font-semibold text-black">Category</div>
                <select
                  required
                  className="appearance-none outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md bg-white cursor-pointer focus:border-color_secondary"
                  value={subDepartment}
                  // onChange={handleOptionChange}
                  onChange={(e) => setSubDepartment(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="basis">Basis</option>
                  <option value="abap">Abap</option>
                  <option value="fico">Fico</option>
                  <option value="pm">PM</option>
                  <option value="hcm">HCM</option>
                  <option value="sd">SD</option>
                  <option value="mm">MM</option>
                </select>
                <div className="absolute top-3 right-0 flex items-center justify-center w-8 h-full pointer-events-none">
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
            }
            <div className="relative mt-7">
              <input
                className="hidden"
                type="file"
                name="pdfFile"
                id="pdf"
                onChange={handlePdf}
              />
              <label
                htmlFor="pdf"
                className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
              >
                <span className="text-sm">Choose PDF</span>
              </label>
              <div className="my-2 ml-1 text-black">
                {formData?.pdfFile?.name && (
                  <div className="flex items-center gap-x-2">
                    <span className="text-color_dark_gray">
                      {formData?.pdfFile?.name}
                    </span>
                    <span className="text-red-700 text-xl">
                      <AiFillFilePdf />
                    </span>
                  </div>
                )}
              </div>
            </div>
            {
              <div className="relative mt-7">
                <input
                  required
                  className="hidden"
                  type="file"
                  name="videoFile"
                  id="video"
                  onChange={handleVideo}
                />
                <label
                  htmlFor="video"
                  className="bg-white text-gray-500 border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <span className="text-sm">Choose Video</span>
                </label>
                <div className="my-2 ml-1 text-black">
                  {formData?.videoFile?.name && (
                    <div className="flex items-center gap-x-2">
                      <span className="text-color_dark_gray">
                        {formData?.videoFile?.name}
                      </span>
                      <span className="text-xl">
                        <FcVlc />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            }
          </div>
          <div className="py-8 w-full flex justify-end">
            {loading ? (
              <>
                <ProgressBar
                  percent={uploadProgress}
                  autoIncrement={false}
                  intervalTime={100}
                  spinner={false}
                  className="rpb-progress rpb-percent-container"
                  containerClassName="rpb-progress rpb-percent-container"
                />
                <div className="flex justify-center relative mt-[20px] mr-5">
                  <div className="custom-loader"></div>
                </div>
              </>
            ) : (
              <button
                type="submit"
                className={` rounded-xl border bg-color_brand px-16 py-2 font-medium text-gray-100 transition-all duration-100`}
              >
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadKnowledge;
