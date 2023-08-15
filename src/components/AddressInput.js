import React from "react";
import CountryList from "./CountryList";

const AddressInput = ({ addressType }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {addressType}
      </label>
      <div className="flex items-center space-x-2">
        <CountryList addressType={addressType} />
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            name={`${addressType}_street`}
            id={`${addressType}_street`}
            className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder={"Street"}
            required
          />
          <input
            type="number"
            name={`${addressType}_number`}
            id={`${addressType}_number`}
            className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder={1}
            required
            min={1}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
