import React from "react";

const Arrow = ({ arrowDirection }) => {
  return arrowDirection === 1 ? (
    <div>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M12 4L8 8M12 4L16 8"
          stroke="#9CA3AF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  ) : (
    <div>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M12 20L8 16M12 20L16 16"
          stroke="#9CA3AF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Arrow;
