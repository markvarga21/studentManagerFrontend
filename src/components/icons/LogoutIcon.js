import React from "react";

const LogoutIcon = ({ color, ICON_SIZES, handleLogout }) => {
  return (
    <svg
      style={{ height: ICON_SIZES / 75 + "vh", minHeight: "20px" }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(-1, 0, 0, 1, 0, 0)"
      onClick={handleLogout}
      data-testid={"logout-icon"}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        ></path>{" "}
        <path
          d="M10 12H20M20 12L17 9M20 12L17 15"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default LogoutIcon;
