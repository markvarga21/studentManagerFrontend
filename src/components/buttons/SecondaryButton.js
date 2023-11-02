import React from "react";

const SecondaryButton = ({ title, onClick }) => {
  return (
    <div
      className="bg-white border-2 border-uniGreen pt-1.5 pb-1.5 pl-3 pr-3 text-uniGreen rounded-lg hover:cursor-pointer hover:bg-uniGreen hover:text-white transition duration-200 ease-in-out"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default SecondaryButton;
