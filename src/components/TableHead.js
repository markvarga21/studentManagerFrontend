import React from "react";

const TableHead = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Id
        </th>
        <th scope="col" className="px-6 py-3">
          First name
        </th>
        <th scope="col" className="px-6 py-3">
          Last name
        </th>
        <th scope="col" className="px-6 py-3">
          Date of Birth
        </th>
        <th scope="col" className="px-6 py-3">
          Place of Birth
        </th>
        <th scope="col" className="px-6 py-3">
          Country of Citizenship
        </th>
        <th scope="col" className="px-6 py-3">
          Gender
        </th>
        <th scope="col" className="px-6 py-3">
          Phone Number
        </th>
        <th scope="col" className="px-6 py-3">
          Passport Number
        </th>
        <th scope="col" className="px-6 py-3">
          Date of Expiry
        </th>
        <th scope="col" className="px-6 py-3">
          Date of Issue
        </th>
        <th scope="col" className="px-6 py-3">
          Operation
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
