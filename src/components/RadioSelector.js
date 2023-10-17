import { Radio } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

const RadioSelector = ({ showSelfie, selfiePhoto, showPassport, idPhoto }) => {
  const [isSelfiePresent, setIsSelfiePresent] = useState(false);
  const [isPassportPresent, setIsPassportPresent] = useState(false);

  useEffect(() => {
    setIsSelfiePresent(selfiePhoto !== null);
    setIsPassportPresent(idPhoto !== null);
  }, [selfiePhoto, idPhoto]);

  const Icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#3F7467"
        className="h-full w-full scale-105 border-0"
      >
        <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
      </svg>
    );
  };
  return (
    <div className="flex">
      {isSelfiePresent === true ? (
        <Radio
          name="type"
          onClick={showSelfie}
          icon={<Icon />}
          className="border-gray-500 bg-white p-0 transition-all hover:before:opacity-0 focus:border-0"
          label={"Show portrait"}
        />
      ) : (
        <div></div>
      )}
      {isPassportPresent === true ? (
        <Radio
          name="type"
          onClick={showPassport}
          icon={<Icon />}
          className="border-gray-500 bg-white p-0 transition-all hover:before:opacity-0 focus:border-0"
          label={"Show passport"}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RadioSelector;
