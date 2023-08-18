import React, { useState } from "react";

const TableHead = ({ setSortingCriteria }) => {
  // 1 -> ascending, -1 descending
  const [sortOrder, setSortOrder] = useState(1);

  const handleSorting = (event) => {
    const sortingByCriteria = event.target.id;
    setSortOrder(-1 * sortOrder);
    console.log(`Sorting ${sortingByCriteria} in ${sortOrder} order.`);
    const sorting = {
      by: sortingByCriteria,
      order: sortOrder,
    };
    setSortingCriteria(sorting);
    console.log(`Sorting by: ${JSON.stringify(sorting)}`);
  };
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          <button id="name" className="cursor-pointer" onClick={handleSorting}>
            NAME
          </button>
        </th>
        <th scope="col" className="px-6 py-3">
          <button
            id="birthdate"
            className="cursor-pointer"
            onClick={handleSorting}
          >
            BIRTHDATE
          </button>
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
