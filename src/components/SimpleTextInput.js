import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SimpleTextInput = ({
  labelText,
  name,
  type,
  id,
  width,
  placeholderValue,
  customValue,
  handleInputChange,
  invalidFields,
  setInvalidFields,
  passportData,
  setFormData,
}) => {
  const inputStyle = `py-3 px-4 block w-${width} border-b-2 border-lightUniGreen focus:outline-none focus:border-uniGreen focus:border-b-2`;
  const errorInputStyle = `py-3 bg-red-100 px-4 block w-${width} border-b-2 border-red-500 focus:outline-none focus:border-red-500 focus:border-b-2`;

  const [invalidField, setInvalidField] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAcceptClick = () => {
    setInvalidField(false);
    setInvalidFields((prevInvalidFields) => ({
      ...prevInvalidFields,
      [name]: false,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: passportData[name],
    }));
    toast.success(
      `Accepted '${capitalizeFirstLetter(
        passportData[name]
      )}' for field ${name.toLowerCase()}`
    );
  };

  useEffect(() => {
    if (name !== undefined) {
      const fieldStatus = invalidFields[name];
      if (fieldStatus === true) {
        setInvalidField(true);
        const element = document.getElementById(id);
        element.value = capitalizeFirstLetter(passportData[name]);
      }
    }
  }, [invalidFields, setInvalidFields, name, id, passportData]);

  return (
    <div>
      {invalidField === true ? (
        <div>
          <div className="flex items-center justify-between">
            <label
              for="input-label"
              className="block font-thin mb-2 text-red-500"
            >
              {labelText}
            </label>
            <button
              className="text-red-500 underline"
              onClick={handleAcceptClick}
            >
              Accept
            </button>
          </div>
          <input
            required
            type={type}
            id={id}
            className={errorInputStyle}
            placeholder={placeholderValue}
            onChange={handleInputChange}
            value={customValue}
            name={name}
          ></input>
        </div>
      ) : (
        <div>
          <label
            for="input-label"
            className="block font-thin mb-2 text-gray-500"
          >
            {labelText}
          </label>
          <input
            required
            type={type}
            id={id}
            className={inputStyle}
            placeholder={placeholderValue}
            onChange={handleInputChange}
            value={customValue}
            name={name}
          ></input>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default SimpleTextInput;
