import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GenderSelector = ({
  labelText,
  name,
  id,
  width,
  selectedOption,
  handleInputChange,
  invalidFields,
  setInvalidFields,
  passportData,
  setFormData,
}) => {
  const selectStyle = `py-3 px-4 block w-${width} border-b-2 border-lightUniGreen focus:outline-none focus:border-uniGreen focus:border-b-2`;
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
          {" "}
          <div className="flex items-center justify-between">
            <label htmlFor={id} className="block font-thin mb-2 text-red-500">
              {labelText}
            </label>
            <button
              className="text-red-500 underline"
              onClick={handleAcceptClick}
            >
              Accept
            </button>
          </div>
          <select
            id={id}
            name={name}
            className={errorInputStyle}
            onChange={handleInputChange}
            value={selectedOption}
          >
            <option value={""}>-- select one --</option>
            <option value={"MALE"}>Male</option>
            <option value={"FEMALE"}>Female</option>
          </select>
        </div>
      ) : (
        <div>
          {" "}
          <label htmlFor={id} className="block font-thin mb-2 text-gray-500">
            {labelText}
          </label>
          <select
            id={id}
            name={name}
            className={selectStyle}
            onChange={handleInputChange}
            value={selectedOption}
          >
            <option value={""}>-- select one --</option>
            <option value={"MALE"}>Male</option>
            <option value={"FEMALE"}>Female</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default GenderSelector;
