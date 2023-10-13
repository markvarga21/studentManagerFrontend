import { Spinner } from "@material-tailwind/react";
import React from "react";

const CustomButton = ({
  buttonType,
  text,
  isLoading,
  loadingText,
  isDisabled,
  disabledText,
  handleButtonClick,
}) => {
  return (
    <div>
      {isDisabled === true ? (
        <div>
          <button
            disabled
            className="text-white bg-gray-500 hover:bg-uniGreenLight font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-uniGreenLight dark:hover:bg-uniGreenLight dark:focus:ring-uniGreenLight hover:cursor-not-allowed"
          >
            {disabledText}
          </button>
        </div>
      ) : (
        <div>
          {isLoading === false ? (
            <button
              onClick={handleButtonClick}
              type={buttonType}
              className=" text-white bg-uniGreen hover:bg-uniGreenLight focus:ring-4 focus:outline-none px-5 py-2.5 focus:ring-uniGreenLight font-medium rounded-lg text-sm text-center dark:bg-uniGreenLight dark:hover:bg-uniGreenLight dark:focus:ring-uniGreenLight"
            >
              {text}
            </button>
          ) : (
            <div>
              <button
                disabled
                className="h-[2.5rem] text-white bg-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-not-allowed"
              >
                <div className="flex gap-3">
                  <Spinner className="h-4 w-4" />
                  {loadingText}
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomButton;
