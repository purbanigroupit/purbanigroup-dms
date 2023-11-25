import React from "react";
import Image from "next/image";
import Creativitly from "../../public/assets/Logos/Creativity_Logo.png";
import Centricity from "../../public/assets/Logos/Customer_Centricity_Logo.png";
import Fairness from "../../public/assets/Logos/Fairness_Logo.png";
import Responsibility from "../../public/assets/Logos/Responsibility_Logo.png";
import Safety from "../../public/assets/Logos/Safety_Logo.png";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const OurValues = () => {
  const router = useRouter();
  useEffect(() => {
    const { scrollToSection } = router.query;
    if (scrollToSection === 'true') {
      const element = document.querySelector('#values');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, []);
  return (
    <div id="values" className="w-full flex items-center justify-center px-90 p-10 bg-[url('https://i.ibb.co/jLCjNGH/vision.png')] bg-no-repeat bg-cover">
      <div className="flex flex-col text-gray-50 rounded-xl w-[1100px] h-[480px] text-center">
        <div className="text-left">
          <div className="pt-8 font-black text-3xl">Our Values</div>
          <div className="max-w-3xl text-lg">Our Values guide us everyday</div>
        </div>
        <div className="w-full pt-5">
          <table className="min-w-full ">
            <thead>
              <tr className="w-full py-10">
                <th>
                  <div className="w-40 flex flex-col gap-2 items-center ">
                    <div>1.</div>
                    <div className="text-7xl">
                      <Image
                        src={Centricity}
                        width={80}
                        height={80}
                        alt={"logo"}
                        onClick={() => {
                          router.push("/");
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>Customer Centricity</div>
                  </div>
                </th>
                <th>
                  <div className=" flex flex-col gap-2 items-center ">
                    <div>2.</div>
                    <div className="text-7xl">
                      <Image
                        src={Responsibility}
                        width={80}
                        height={80}
                        alt={"logo"}
                        onClick={() => {
                          router.push("/");
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>Responsibility</div>
                  </div>
                </th>
                <th>
                  <div className=" flex flex-col gap-2 items-center ">
                    <div>3.</div>
                    <div className="text-7xl">
                      <Image
                        src={Creativitly}
                        width={80}
                        height={80}
                        alt={"logo"}
                        onClick={() => {
                          router.push("/");
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>Creativity and Quality</div>
                  </div>
                </th>
                <th>
                  <div className=" flex flex-col gap-2 items-center ">
                    <div>4.</div>
                    <div className="text-7xl">
                      <Image
                        src={Fairness}
                        width={100}
                        height={100}
                        alt={"logo"}
                        onClick={() => {
                          router.push("/");
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>Fairness</div>
                  </div>
                </th>
                <th>
                  <div className=" flex flex-col gap-2 items-center ">
                    <div>5.</div>
                    <div className="text-7xl">
                      <Image
                        src={Safety}
                        width={80}
                        height={80}
                        alt={"logo"}
                        onClick={() => {
                          router.push("/");
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>Safety</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="w-40 pt-6 pr-4">
                  Customers are always the focus of Purbani Group policy and
                  strategy planning.
                </td>
                <td className="pt-6 pr-4">
                  As a leading enterprise in Bangladesh in the field of garment
                  and textile Purbani Group not only focuses on business goals
                  but also actively affirms its leadership in improving living
                  standards for employees and for the society.
                </td>
                <td className="pt-6 pr-4">
                  The central factors of creativity are the ability to create
                  the most suitable designs, choose materials, and improve
                  equipment and production systems using the latest technology.
                  Purbani Group always sets standards to meet or exceed market
                  and consumer requirements
                </td>
                <td className="0 pt-6 pr-4">
                  Purbani Group always creates a fair working environment and
                  promote opportunities for all employees.
                </td>
                <td className="pt-6 pr-4">
                  The Corporation is always interested in ensuring the health
                  and safety of all employees during the working process.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default dynamic(() => Promise.resolve(OurValues), { ssr: false });