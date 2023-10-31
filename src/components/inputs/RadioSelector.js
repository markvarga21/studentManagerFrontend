import React, { useEffect, useState } from "react";

const RadioSelector = ({ showSelfie, selfiePhoto, showPassport, idPhoto }) => {
  const activeStyle =
    "bg-uniGreen text-white p-3 w-full hover:cursor-pointer text-center";
  const inactiveStyle =
    "bg-gray-400 text-gray-700 p-3 w-full hover:cursor-pointer text-center";

  const [passportStyle, setPassportStyle] = useState(inactiveStyle);
  const [selfieStyle, setSelfieStyle] = useState(inactiveStyle);

  const activatePassportButton = () => {
    setPassportStyle(activeStyle);
    setSelfieStyle(inactiveStyle);
    showPassport();
  };

  const activateSelfieButton = () => {
    setSelfieStyle(activeStyle);
    setPassportStyle(inactiveStyle);
    showSelfie();
  };

  const handlePassportClick = () => {
    if (idPhoto !== null) {
      activatePassportButton();
    }
    showPassport();
  };

  const handleSelfieClick = () => {
    if (selfiePhoto !== null) {
      activateSelfieButton();
    }
    showSelfie();
  };

  useEffect(() => {
    if (idPhoto !== null && selfiePhoto === null) {
      activatePassportButton();
    } else if (idPhoto === null && selfiePhoto !== null) {
      activateSelfieButton();
    } else if (idPhoto !== null && selfiePhoto !== null) {
      activateSelfieButton();
    }
  }, [selfiePhoto, idPhoto]);

  return (
    <div className="flex w-56">
      <div
        className={passportStyle + " rounded-l-lg"}
        onClick={handlePassportClick}
      >
        Passport
      </div>
      <div
        className={selfieStyle + " rounded-r-lg"}
        onClick={handleSelfieClick}
      >
        Selfie
      </div>
    </div>
  );
};

export default RadioSelector;
