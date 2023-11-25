import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Layout from "../components/common/Layout";
import { useRouter } from "next/router";
import { AuthProvider, authContext } from "../context/authContext";
import { useContext } from "react";

const bgUrl =
  "bg-[url('https://res.cloudinary.com/dfhzvfeh4/image/upload/v1689253529/background-images/bg_primary_znk4if.png')]";
const bgStyles = "bg-no-repeat bg-cover h-screen";

export default function MyApp({ Component, pageProps: { ...pageProps } }) {

  return (
    <AuthProvider>
      <section className={`${bgUrl} ${bgStyles}`}>
        {Component.auth ? (
          <Auth adminOnly={Component?.auth?.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </section>
    </AuthProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { state } = useContext(authContext);

  if (state.loading) {
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

  if (!state.user && !state.logout) {
    router.push("/unauthorized?message=Login Required");
  }

  if (adminOnly && !state.user?.isAdmin && !state.logout) {
    router.push("/unauthorized?message=Admin Login Required");
  }

  return children;
}
