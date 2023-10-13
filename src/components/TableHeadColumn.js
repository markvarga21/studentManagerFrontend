import React from "react";
import Arrow from "./Arrow";

const TableHeadColumn = ({
  crit,
  sortingCriteria,
  columnName,
  sortingOrder,
  handleSortByCriteria,
}) => {
  return (
    <th
      className="px-6 py-3 cursor-pointer items-center"
      id={crit}
      onClick={() => handleSortByCriteria(crit)}
    >
      <div className="flex items-center select-none">
        {columnName}
        {sortingCriteria === crit && <Arrow arrowDirection={sortingOrder} />}
      </div>
    </th>
  );
};

export default TableHeadColumn;
