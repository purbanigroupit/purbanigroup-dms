import Layout from "../../components/common/Layout";
import DashboardLayout from "../../components/common/DashboardLayout";
import styles from "../../styles/DashboardIndex.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { countWizards, dashboardRoutes } from "../../constants/Dashboard";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  if (loading) {
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
    <Layout title="Dashboard">
      <DashboardLayout>
        <>
          <div className={`${styles.dashboardWizard}`}>
            {countWizards.map(({ title, count }) => {
              return (
                <div key={title}>
                  <div className="text-3xl font-semibold">{count}</div>
                  <div>{title}</div>
                </div>
              );
            })}
          </div>
          <div
            className={`${styles.dashboardOptions} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center items-center my-5 mx-auto`}
          >
            {dashboardRoutes.map(({ title, route }, i) => {
              return (
                <div
                  key={i}
                  onClick={() => router.push(route)}
                  className={`${styles.optionCard} max-w-[279px] h-[266px] w-full p-[20px] relative group hover:bg-color_brand duration-300 cursor-pointer`}
                >
                  <div className="text-5xl absolute text-color_pink group-hover:text-color_white duration-300">
                    {i + 1}
                  </div>
                  <div className="text-xl font-semibold h-full flex justify-center items-center">
                    {title}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      </DashboardLayout>
    </Layout>
  );
};

Dashboard.auth = {
  adminOnly: true,
};
export default Dashboard;
