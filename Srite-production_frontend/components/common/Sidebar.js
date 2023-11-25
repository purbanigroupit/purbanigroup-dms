import styles from "../../styles/Sidebar.module.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { dashboardRoutes } from "../../constants/Dashboard";

const Sidebar = () => {
  const router = useRouter();
  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    router.push("/login");
    localStorage.clear("x-auth-token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <aside className="max-w-[259px] w-full">
      <div className={`${styles.sidebar} h-screen`}>
        <div
          onClick={() => router.push("/dashboard")}
          className={`${styles.sidebarTop} text-color_white text-2xl cursor-pointer`}
        >
          <h2>Admin</h2> <h2>Dashboard</h2>
        </div>
        <div
          className={`${styles.sidebarBottom} text-color_white py-10 px-4 text-2xl flex flex-col gap-y-4`}
        >
          {dashboardRoutes.map(({ title, route, Icon }) => {
            return (
              <button
                key={title}
                onClick={() => router.push(route)}
                className="flex items-center gap-x-2 w-fit hover:translate-x-3 duration-200"
              >
                {Icon}
                <h2>{title}</h2>
              </button>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-x-2 w-fit hover:translate-x-3 duration-200"
          >
            <AiOutlineLogout />
            <h2>Logout</h2>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
