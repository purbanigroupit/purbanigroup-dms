import React, { useState } from "react";

const DepartmentList = ({
  departments,
  department,
  setDepartment,
  setSubDepartment,
}) => {
  const [selected, setSelected] = useState(department);

  const handleClick = (name) => {
    if (name !== "sustainability") setSubDepartment("");
    setDepartment(name);
    setSelected(name);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-x-4 justify-start items-center ">
        {departments.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(item.name)}
              className={`flex gap-x-5 items-center justify-between shadow-lg py-2 px-5 group hover:bg-color_brand duration-300 border-l-2 border-r-2 hover:border-color_white rounded-md mb-2 ${
                selected === item.name ? "bg-color_brand" : "bg-white"
              }`}
            >
              <div
                className={`font-bold text-xl group-hover:text-color_white duration-300 ${
                  item?.name === "it"
                    ? "uppercase"
                    : item?.name === "hr"
                    ? "uppercase"
                    : "capitalize"
                } ${
                  selected === item.name
                    ? "text-color_white"
                    : "text-color_secondary"
                }`}
              >
                {item.name}
              </div>
              <div
                className={`text-3xl ext-color_pink group-hover:text-color_white duration-300 ${
                  selected === item.name
                    ? "text-color_white"
                    : "text-color_secondary"
                }`}
              >
                {item.logo}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentList;
