import React from "react";

const TableRow = ({
  id,
  firstName,
  lastName,
  birthDate,
  placeOfBirth,
  countryOfCitizenship,
  gender,

  passportNumber,
  passportDateOfExpiry,
  passportDateOfIssue,
  handleEditUser,
  handleDeleteUser,
}) => {
  return (
    <tr className="bg-white text-black border-solid border-b-1 border-black hover:bg-lightUniGreen">
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">{firstName}</td>
      <td className="px-6 py-4">{lastName}</td>
      <td className="px-6 py-4">{birthDate}</td>
      <td className="px-6 py-4">{placeOfBirth}</td>
      <td className="px-6 py-4">{countryOfCitizenship}</td>
      <td className="px-6 py-4">{String(gender).toLowerCase()}</td>
      <td className="px-6 py-4">{passportNumber}</td>
      <td className="px-6 py-4">{passportDateOfExpiry}</td>
      <td className="px-6 py-4">{passportDateOfIssue}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col space-y-3">
          <a
            id={id}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
            onClick={handleEditUser}
          >
            Edit user
          </a>
          <a
            id={id}
            className="font-medium text-red-600 dark:red-blue-500 hover:underline cursor-pointer"
            onClick={handleDeleteUser}
          >
            Delete user
          </a>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
