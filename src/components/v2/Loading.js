import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-darkGray opacity-80 z-30">
      <div className="flex items-center gap-3">
        <div
          className={`inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-tableGray motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
          role="status"
        ></div>
        <span className="text-tableGray text-xl font-bold flex items-end gap-1">
          {text}
          <div class="loader mb-[4px]"></div>
        </span>
      </div>
    </div>
  );
};

export default Loading;
