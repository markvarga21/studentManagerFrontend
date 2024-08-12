import React from "react";

const NotFound = ({ colorModeColors }) => {
  return (
    <div
      id="not-found"
      className="flex flex-col items-center justify-center w-full gap-3 font-inter pb-56"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <div
        className="w-fit text-8xl font-bold"
        style={{ color: colorModeColors.title }}
      >
        404
      </div>
      <div
        className="text-3xl font-bold"
        style={{ color: colorModeColors.title }}
      >
        Not Found
      </div>
      <div
        className="w-2/3 text-center font-light pt-4 text-lg"
        style={{ color: colorModeColors.tableContent }}
      >
        The page you are looking for does not exist. Please go back to the home
        page.
      </div>
    </div>
  );
};

export default NotFound;
