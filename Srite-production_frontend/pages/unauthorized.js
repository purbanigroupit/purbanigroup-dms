import { useRouter } from "next/router";
import Layout from "../components/common/Layout";
import dynamic from "next/dynamic";
import Link from "next/link";

const UnauthorizedScreen = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized">
      <div className="h-[100vh] bg-black opacity-70  grid place-items-center">
        <div className="text-black text-center w-full bg-white drop-shadow-2xl rounded-lg p-12">
          <h1 className="text-xl text-accent text-center">Access Denied</h1>
          {message && (
            <div className="mb-4 text-error text-center">{message}</div>
          )}
          <Link className="mt-2" href={"/"}>
            <button className="bg-color_secondary p-3 text-white font-semibold rounded">
              Go to Home
            </button>
          </Link>
          <hr className="my-2" />
          <h2 className="">Or</h2>
          <hr className="my-2" />
          <Link className=" mt-4 block" href={"/login"}>
            <button className="bg-color_secondary p-3 text-white font-semibold rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(UnauthorizedScreen), {
  ssr: false,
});
