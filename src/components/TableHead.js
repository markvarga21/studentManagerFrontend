import React from "react";

const TableHead = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Birthdate
        </th>
        <th scope="col" className="px-6 py-3">
          Place of birth
        </th>
        <th scope="col" className="px-6 py-3">
          Nationality
        </th>
        <th scope="col" className="px-6 py-3">
          Gender
        </th>
        <th scope="col" className="px-6 py-3">
          Address
        </th>
        <th scope="col" className="px-6 py-3">
          Phone number
        </th>
        <th scope="col" className="px-6 py-3">
          Operation
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
