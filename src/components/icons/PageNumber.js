import React from "react";

const PageNumber = ({ content, active, color, onClick }) => {
  const ACTIVE_CLASS =
    "page font-inter font-bold text-sm pl-3 pr-3 pt-2 pb-2 rounded-md hover:cursor-pointer select-none";
  const INACTIVE_CLASS =
    "page font-inter font-bold text-sm pl-3 pr-3 pt-2 pb-2 rounded-md hover:cursor-pointer select-none";
  return (
    <div
      id={`page-${content}`}
      className={active ? ACTIVE_CLASS : INACTIVE_CLASS}
      style={{
        backgroundColor: active ? color.activePageBack : "transparent",
        color: active ? color.activePageText : color.inactivePageText,
      }}
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default PageNumber;
