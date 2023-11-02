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
  setEditFormData,
  editFormData,
}) => {
  const inputStyle = `py-3 px-4 block w-${width} border-b-2 border-lightUniGreen focus:outline-none focus:border-uniGreen focus:border-b-2`;
  const errorInputStyle = `py-3 bg-red-100 px-4 block w-${width} border-b-2 border-red-500 focus:outline-none focus:border-red-500 focus:border-b-2`;

  const [invalidField, setInvalidField] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const handleAcceptClick = () => {
    const dataToUpdate = { ...editFormData, [name]: suggestion };
    setEditFormData(dataToUpdate);
    setInvalidField(false);
    const message = `Accepted ${suggestion} instead of ${editFormData[name]}!`;
    setInvalidFields({
      firstName: false,
      lastName: false,
      birthDate: false,
      placeOfBirth: false,
      countryOfCitizenship: false,
      gender: false,
      passportNumber: false,
      passportDateOfExpiry: false,
      passportDateOfIssue: false,
    });
    toast.success(message);
  };

  useEffect(() => {
    if (name !== undefined) {
      const fieldStatus = invalidFields[name];
      if (fieldStatus === true) {
        const passValue = passportData[name];
        if (passValue !== null) {
          setInvalidField(true);
          setSuggestion(`${passValue}`);
        } else {
          const message = `Field ${name} cannot be extracted from passport!\nPlease validate it manually`;
          toast.error(message);
        }
      }
    }
  }, [invalidFields, setInvalidFields, name, id, passportData]);

  return (
    <div id="fullInput">
      {invalidField ? (
        <div id="invalidInput">
          <div className="flex justify-between">
            <label
              htmlFor="input-label"
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

          <div className="flex items-center gap-1 mt-2">
            <div className="text-sm">Suggesting: </div>
            <div className="bg-uniGreen text-white p-1 rounded-lg text-sm font-thin">
              {suggestion}
            </div>
          </div>
        </div>
      ) : (
        <div id="validInput">
          <label
            htmlFor="input-label"
            className="block font-thin mb-2 text-gray-700"
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
          <div className="h-8"></div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default SimpleTextInput;
