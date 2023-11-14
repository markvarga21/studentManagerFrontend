import React, { useEffect, useState } from "react";

const RadioSelector = ({
  showSelfie,
  selfiePhoto,
  showPassport,
  idPhoto,
  whatWasChanged,
}) => {
  const activeStyle =
    "bg-uniGreen text-white p-3 w-3/4 hover:cursor-pointer text-center";
  const inactiveStyle =
    "bg-gray-400 text-gray-700 p-3 w-3/4 hover:cursor-pointer text-center";

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
      if (whatWasChanged === "PASSPORT") {
        activatePassportButton();
      } else if (whatWasChanged === "SELFIE") {
        activateSelfieButton();
      }
    }
  }, [selfiePhoto, idPhoto]);

  return (
    <div className="flex w-72">
      <div
        className={passportStyle + " rounded-l-lg"}
        onClick={handlePassportClick}
      >
        Show passport
      </div>
      <div
        className={selfieStyle + " rounded-r-lg"}
        onClick={handleSelfieClick}
      >
        Show selfie
      </div>
    </div>
  );
};

export default RadioSelector;
