import React from "react";

const DisplayCard = ({ children, dataLength }) => {

  return (
    <div className="w-full">
      <div
        className={`flex ${
          dataLength > 9 ? "overflow-y-scroll" : ""
        } items-center justify-center mt-28 h-[550px] w-[750px] bg-white rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default DisplayCard;
