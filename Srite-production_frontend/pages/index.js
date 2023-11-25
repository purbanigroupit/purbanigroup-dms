import Navbar from "../components/common/navbar";
import DownloadCard from "../components/landingPage/DownloadCard";
import GlanceCard from "../components/landingPage/GlanceCard";
import MissionAndVision from "../components/landingPage/MissionAndVission";
import OurValues from "../components/landingPage/OurValues";
import Footer from "../components/landingPage/Footer";
import Layout from "../components/common/Layout";

export default function Home() {

  return (
    <Layout title="Home">
      <Navbar />
      <DownloadCard />
      <GlanceCard />
      <MissionAndVision />
      <OurValues />
      <Footer />
    </Layout>
  );
}
