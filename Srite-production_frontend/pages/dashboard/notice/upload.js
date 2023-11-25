import React, { useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useRouter } from "next/router";
import styles from "../../../styles/upload.module.css";
import axios from "axios";
import upImg from "../../../public/assets/images/upload.png";
import Image from "next/image";
import { baseUrl } from "../../../api/api";

const Upload = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // initialize form fields
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];


    setFormData((prevFormData) => ({
      ...prevFormData,
      pdfFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("pdfFile", formData.pdfFile);

    try {
      const { data: data } = await axios.post(
        `${baseUrl}/common/upload-notice-pdf`,
        form,
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      );

      setLoading(false);
      if (data.statusCode === 201) {
        router.push("/dashboard/success");
      }


    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className={`${styles.uploadCon} w-3/4`}>
        <div>
          <h2>Upload File</h2>
        </div>
        <div className={`${styles.uploadContent}`}>
          <label htmlFor="file1">
            <Image
              src={upImg}
              alt="img of the upload"
              width={100}
              height={100}
            />
          </label>
          <label htmlFor="file1">
            <h3>
              {formData?.pdfFile?.name
                ? formData?.pdfFile?.name
                : "Browse File to Upload"}
            </h3>
          </label>
          <label className="bg-[#8413B9] py-2 px-4 rounded-xl" htmlFor="file1">
            Browse
          </label>
          <input
            id="file1"
            type="file"
            name="pdfFile"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {loading ? (
          <div className="flex justify-center relative mt-[20px]">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div>
            <button type="submit">Upload</button>
          </div>
        )}
      </form>
    </DashboardLayout>
  );
};

Upload.auth = {
  adminOnly: true,
};
export default Upload;
