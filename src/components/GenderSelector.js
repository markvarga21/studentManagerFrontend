import React from "react";

const GenderSelector = () => {
  return (
    <div>
      <label
        htmlFor="genders"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        className="
        w-30 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block p-2.5
        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
      "
      >
        <option value="">-- select one --</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
    </div>
  );
};

export default GenderSelector;
