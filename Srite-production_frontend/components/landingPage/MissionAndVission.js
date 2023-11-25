import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MissionAndVision = () => {
  const router = useRouter()
  useEffect(() => {
    const { scrollToSection } = router.query;
    if (scrollToSection === 'true') {
      const element = document.getElementById('mission');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
    if (scrollToSection === 'true') {
      const element = document.getElementById('vision');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, []);
  return (
    <div className="w-full flex items-center justify-center px-90 pb-20">
      <div className="flex flex-col items-center justify-between text-gray-700 bg-white  rounded-xl text-center max-w-[1150px]">
        <div id="mission" className=" pt-8 text-left">
          <div className="pt-8 font-semibold text-2xl pb-5">Mission</div>
          <hr></hr>
          <div className="text-lg pr-10 pt-5 pb-10">
            To develop sustainability with our partners in order to provide fashionable,
            high-quality products and service which conform to international standards by innovation
            and diversify fashionable products in order to serve all international customer
            segmentation and to contribute for community development and sustainable environment.
          </div>
        </div>
        <div id="vision" className=" pt-8 text-left">
          <div className="pt-8 font-semibold text-2xl pb-5">Vision</div>
          <hr></hr>
          <div className="text-lg pr-10 pt-5 pb-10">
            PURBANI is one of the largest & oldest established 100% export oriented Textile
            conglomerates in Bangladesh since 1973 and doing business for more than 5 decades with
            eminence. It is a vertically integrated textile-manufacturing group and running with
            13-business unit involve in Spinning, Yarn Dyeing, Fabrics Manufacturing & Dyeing, Ready
            Made Garments, Retail Clothing and Agriculture.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
