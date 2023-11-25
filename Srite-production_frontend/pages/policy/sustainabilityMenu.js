import React from "react";
import Layout from "../../components/common/Layout";
import Navbar from "../../components/common/navbar";
import SustainabilityMenuList from "../../components/common/sustainabilityMenuList";

const SustainabilityMenu = () => {
  return (
    <Layout>
      <Navbar />
      <SustainabilityMenuList url="policy" />
    </Layout>
  );
};

SustainabilityMenu.auth = true;
export default SustainabilityMenu;
