import React from "react";
import Arrow from "./Arrow";
import TableHeadColumn from "./TableHeadColumn";

const TableHead = ({
  sortingCriteria,
  setSortByCriteria,
  sortingOrder,
  setSortingOrder,
  sortItems,
}) => {
  const handleSortByCriteria = (crit) => {
    //event.preventDefault();
    const criteria = String(crit).substring(1);
    const newOrderObject = sortingOrder;
    newOrderObject[criteria] = -1 * newOrderObject[criteria];
    setSortingOrder(newOrderObject);
    setSortByCriteria(crit);
    sortItems(criteria, sortingOrder[criteria]);
  };

  return (
    <thead className="text-xs text-white uppercase bg-uniGreen dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 select-none">
          Id
        </th>
        <TableHeadColumn
          crit={"_firstName"}
          sortingCriteria={sortingCriteria}
          columnName={"First name"}
          sortingOrder={sortingOrder.firstName}
          handleSortByCriteria={handleSortByCriteria}
        />
        <TableHeadColumn
          crit={"_lastName"}
          sortingCriteria={sortingCriteria}
          columnName={"Last name"}
          sortingOrder={sortingOrder.lastName}
          handleSortByCriteria={handleSortByCriteria}
        />
        <TableHeadColumn
          crit={"_birthDate"}
          sortingCriteria={sortingCriteria}
          columnName={"Date of Birth"}
          sortingOrder={sortingOrder.birthDate}
          handleSortByCriteria={handleSortByCriteria}
        />
        <th
          className="px-6 py-3 cursor-pointer items-center"
          id={"_placeOfBirth"}
          onClick={() => handleSortByCriteria("_placeOfBirth")}
        >
          <div className="flex items-center select-none">
            Place of Birth
            {sortingCriteria === "_placeOfBirth" && (
              <Arrow arrowDirection={sortingOrder.placeOfBirth} />
            )}
          </div>
        </th>
        <TableHeadColumn
          crit={"_countryOfCitizenship"}
          sortingCriteria={sortingCriteria}
          columnName={"Country of Citizenship"}
          sortingOrder={sortingOrder.countryOfCitizenship}
          handleSortByCriteria={handleSortByCriteria}
        />
        <TableHeadColumn
          crit={"_gender"}
          sortingCriteria={sortingCriteria}
          columnName={"Gender"}
          sortingOrder={sortingOrder.gender}
          handleSortByCriteria={handleSortByCriteria}
        />
        <TableHeadColumn
          crit={"_passportNumber"}
          sortingCriteria={sortingCriteria}
          columnName={"Passport Number"}
          sortingOrder={sortingOrder.passportNumber}
          handleSortByCriteria={handleSortByCriteria}
        />
        <TableHeadColumn
          crit={"_passportDateOfExpiry"}
          sortingCriteria={sortingCriteria}
          columnName={"Date of Expiry"}
          sortingOrder={sortingOrder.passportDateOfExpiry}
          handleSortByCriteria={handleSortByCriteria}
        />
        <TableHeadColumn
          crit={"_passportDateOfIssue"}
          sortingCriteria={sortingCriteria}
          columnName={"Date of Issue"}
          sortingOrder={sortingOrder.passportDateOfIssue}
          handleSortByCriteria={handleSortByCriteria}
        />
        <th scope="col" className="px-6 py-3 select-none">
          Operation
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
