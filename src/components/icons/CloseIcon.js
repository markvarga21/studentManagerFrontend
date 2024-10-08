import React from "react";

const CloseIcon = ({ color, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="hover:cursor-pointer hover:bg-gray p-2 rounded-full"
    >
      <svg
        style={{ width: "2vh", minWidth: "23px" }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"hover:cursor-pointer"}
        onClick={handleClick}
        data-testid={"close-icon"}
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
            fill={color}
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default CloseIcon;
