import React from "react";

const GenderSelector = ({
  labelText,
  name,
  id,
  width,
  selectedOption,
  handleInputChange,
}) => {
  const selectStyle = `py-3 px-4 block w-${width} border-b-2 border-lightUniGreen focus:outline-none focus:border-uniGreen focus:border-b-2`;

  return (
    <div>
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
  );
};

export default GenderSelector;
