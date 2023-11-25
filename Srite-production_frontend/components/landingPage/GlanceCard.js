import React from "react";

const GlanceCard = () => {
  return (
    <div className="w-full flex items-center justify-center px-90 p-10 ">
      <div className="flex flex-col items-center justify-between text-gray-700 bg-white border rounded-xl w-[1100px] h-[480px] text-center">
        <div className="text-color_brand pt-8 font-extrabold text-2xl">
          PURBANI GROUP AT A GLANCE
        </div>
        <div className="max-w-3xl text-lg">
          Purbani is one of the largest & oldest established 100% export oriented Textile
          conglomerates in Bangladesh since 1973 and doing business for more than 5 decades with
          empinence. It is a vertically integrated textile-manufacturing group and running with
          13-bisiness unit invlolve in spinning. Yarn Dyeing, Fabrics Manufacturing & Dyeing, Ready
          Made Garments, Retail Clothing and Agriculture.
        </div>
        <div className="w-full">
          <table className="min-w-full">
            <thead>
              <tr className="w-full  px-2 py-10">
                <th className="">ESTABLISHED IN</th>
                <th>NO OF BRANCHES</th>
                <th>NO OF CUSTOMERS</th>
                <th>NO OF EMPLOYEES</th>
                <th>NO OF PIECE IN A SHIPMENT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-3xl font-bold">
                <td className="text-color_brand pt-6">1973</td>
                <td className="text-yellow-600 pt-6">13</td>
                <td className="text-indigo-800 pt-6">21</td>
                <td className="text-green-600 pt-6">10,012</td>
                <td className="text-purple-700 pt-6">2017954643</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full text-end px-8 text-xs pb-6 text-fuchsia-800">
          * AS OF 30 MARCH, 2023{" "}
        </div>
      </div>
    </div>
  );
};

export default GlanceCard;
