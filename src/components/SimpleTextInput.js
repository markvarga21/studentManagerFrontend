import React from "react";
import { Input } from "@material-tailwind/react";

const SimpleTextInput = ({
  labelText,
  name,
  id,
  placeholderValue,
  customValue,
  isThereError,
}) => {
  const width = 36;
  const containerStyle = width ? `w-${width}` : `w-36`;
  return (
    <div className={containerStyle}>
      {isThereError === true ? (
        <div className="flex space-x">
          <Input
            id={id}
            name={name}
            variant="static"
            label={labelText}
            placeholder={placeholderValue}
            color="teal"
            error
            required
            value={customValue}
          />
          <div>
            <button className="underline">Accept</button>
          </div>
        </div>
      ) : (
        <Input
          id={id}
          name={name}
          variant="static"
          label={labelText}
          placeholder={placeholderValue}
          color="teal"
          required
          value={customValue}
        />
      )}
    </div>
  );
};

export default SimpleTextInput;
