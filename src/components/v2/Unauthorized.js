import React from "react";

const Unauthorized = ({ colorModeColors }) => {
  return (
    <div
      id="unauthorized"
      className="flex flex-col items-center justify-center w-full gap-3 font-inter pb-56"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <div
        className="w-fit text-8xl font-bold"
        style={{ color: colorModeColors.title }}
      >
        401
      </div>
      <div
        className="text-3xl font-bold"
        style={{ color: colorModeColors.title }}
      >
        Unauthorized
      </div>
      <div
        className="w-2/3 text-center font-light pt-4 text-lg"
        style={{ color: colorModeColors.tableContent }}
      >
        You are not authorized to view this page. Please go back to the home
        page.
      </div>
    </div>
  );
};

export default Unauthorized;
