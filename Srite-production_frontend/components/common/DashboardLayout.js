import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Layout from "./Layout";
import Navbar from "./navbar";

const DashboardLayout = ({ title, children }) => {

  return (
    <Layout title={title ? title + " - Dashboard" : "Dashboard"}>
      <div className="flex justify-between text-white">
        <Sidebar/>
        <div className="h-screen overflow-y-auto flex-1 relative">
          <DashboardHeader />
          <div className="p-5 flex flex-col justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardLayout;
