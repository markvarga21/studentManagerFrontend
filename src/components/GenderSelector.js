import { Option, Select } from "@material-tailwind/react";
import React from "react";

const GenderSelector = ({ customValue, isErrorPresent }) => {
  return (
    <div>
      {isErrorPresent === true ? (
        <div className="flex space-x-3">
          <Select variant="static" label="Gender" error>
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
          </Select>
          <div className="underline hover:cursor-pointer">Accept</div>
        </div>
      ) : (
        <Select
          variant="static"
          label="Gender"
          color="tail"
          size="md"
          value={customValue}
        >
          <Option value="MALE">Male</Option>
          <Option value="FEMALE">Female</Option>
        </Select>
      )}
    </div>
  );
};

export default GenderSelector;
