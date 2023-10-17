import { Spinner } from "@material-tailwind/react";
import React, { useEffect } from "react";

const CustomButton = ({
  buttonType,
  text,
  isLoading,
  loadingText,
  isDisabled,
  disabledText,
  handleButtonClick,
}) => {
  const disabledStyle =
    "h-full text-white bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-not-allowed";
  const normalStyle =
    "h-full text-white bg-uniGreen hover:bg-darkUniGreen px-5 py-2.5 font-medium rounded-lg text-sm text-center focus:ring-4 ring-lightUniGreen";

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
        {isLoading === true ? (
          <div className="flex gap-3">
            <Spinner className="h-4 w-4" />
            <p>{loadingText}</p>
          </div>
        ) : (
          <p>{isDisabled === true ? disabledText : text}</p>
        )}
      </button>
    </div>
  );
};

export default CustomButton;
