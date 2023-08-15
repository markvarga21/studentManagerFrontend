import React from "react";
import cities from "../utils/cities_hu.json";

const CityList = ({ addressType }) => {
  return (
    <div>
      <select
        id={`${addressType}_city`}
        name={`${addressType}_city`}
        className="
          w-30 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block p-2.5
          dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
        "
      >
        <option value="">-- select one --</option>
        {cities.map((cityObj) => (
          <option value={cityObj.city}>{cityObj.city}</option>
        ))}
      </select>
    </div>
  );
};

export default CityList;
