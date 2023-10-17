import React, { useEffect } from "react";
import SpinnerIcon from "./SpinnerIcon";

const CustomButton = ({
  buttonType,
  text,
  isLoading,
  loadingText,
  isDisabled,
  disabledText,
  handleButtonClick,
  customIcon,
  inputData,
}) => {
  const disabledStyle =
    "2xl:w-6/8 lg:w-4/8 text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-not-allowed";
  const normalStyle =
    "2xl:w-6/8 lg:w-4/8 text-white bg-uniGreen hover:bg-darkUniGreen px-5 py-2.5 font-medium rounded-lg text-sm text-center focus:ring-4 ring-lightUniGreen transition duration-150 ease-in-out";

  const [buttonStyle, setButtonStyle] = React.useState(normalStyle);

  useEffect(() => {
    if (isDisabled === true) {
      setButtonStyle(disabledStyle);
    } else {
      setButtonStyle(normalStyle);
    }
  }, [isDisabled]);

  return (
    <div>
      <button
        type={buttonType}
        className={buttonStyle}
        onClick={handleButtonClick}
      >
        <div>
          {isLoading === true ? (
            <div className="flex hover:cursor-not-allowed">
              <SpinnerIcon />
              <p>{loadingText}</p>
            </div>
          ) : (
            <div>
              {customIcon !== undefined ? (
                <div className="flex gap-2 items-center justify-between">
                  {isDisabled === true ? <p>{disabledText}</p> : <p>{text}</p>}
                  {customIcon !== undefined ? customIcon : <div></div>}
                </div>
              ) : (
                <div>
                  {isDisabled === true ? <p>{disabledText}</p> : <p>{text}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default CustomButton;
