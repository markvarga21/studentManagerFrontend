import React from "react";
import { Input } from "@material-tailwind/react";

const SimpleTextInput = ({
  labelText,
  name,
  type,
  id,
  width,
  placeholderValue,
  customValue,
  handleInputChange,
}) => {
  const inputStyle = `py-3 px-4 block w-${width} border-b-2 border-lightUniGreen focus:outline-none focus:border-uniGreen focus:border-b-2`;

  return (
    <div>
      <label for="input-label" class="block font-thin mb-2 text-gray-500">
        {labelText}
      </label>
      <input
        required
        type={type}
        id={id}
        class={inputStyle}
        placeholder={placeholderValue}
        onChange={handleInputChange}
        value={customValue}
        name={name}
      ></input>
    </div>
  );
};

export default SimpleTextInput;
