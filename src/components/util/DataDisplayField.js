import React from "react";

const DataDisplayField = ({ label, content, colors }) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className="font-inter font-semibold 2xl:text-lg xl:text-sm"
        style={{ color: colors.inputText }}
      >
        {label}
      </div>
      <div
        className="data-display font-inter font-normal text-sm p-4 rounded-xl hover:cursor-not-allowed"
        style={{
          backgroundColor: colors.tableHeader,
          color: colors.tableContent,
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default DataDisplayField;
