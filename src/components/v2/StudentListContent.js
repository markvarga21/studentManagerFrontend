import React, { useEffect, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import SearchIcon from "../icons/SearchIcon";
import Validity from "./Validity";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Pagination from "../icons/Pagination";
import axios from "axios";
import ExportIcon from "../icons/ImportIcon";
import UserModalV2 from "./UserModalV2";
import toast from "react-hot-toast";
import formatXml from "xml-formatter";

const StudentListContent = ({
  colorModeColors,
  currentTheme,
  studentId,
  setStudentId,
  isEditActive,
  setIsEditActive,
  user,
  setUser,
  API_URL,
}) => {
  const [filter, setFilter] = useState("All");
  const [activePage, setActivePage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const handleStatusChange = (event) => {
    setFilter(event.target.value);
  };
  const [students, setStudents] = useState([]);
  const MONTHS = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const mapDateToVerboseString = (date) => {
    // const components = date.split("-");
    // const year = components[0];
    // const month = MONTHS[components[1]];
    // const day = String(components[2]).startsWith("0")
    //   ? components[2][1]
    //   : components[2];
    // return `${month} ${day}, ${year}`;
    return date;
  };
  const [deleted, setDeleted] = useState(1);
  const [isAddStudentActive, setIsAddStudentActive] = useState(false);

  const exportJson = (data, token, API_URL) => {
    const json = JSON.stringify(data, null, 2);
    console.log(json);
    axios
      .post(`${API_URL}/export/validate/json`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const valid = res.data;
        if (valid) {
          const blob = new Blob([json], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "students.json";
          a.click();
          URL.revokeObjectURL(url);
        } else {
          toast.error("Invalid data. Please correct the errors.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportXml = (data, token, API_URL) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    const content = data.map((student) => makeStudentXml(student)).join("");
    const body = xml + `<students>${content}</students>`;
    const formatted = formatXml(body, {
      indentation: "  ",
      collapseContent: true,
    });
    axios
      .post(`${API_URL}/export/validate/xml`, formatted, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/xml",
        },
      })
      .then((res) => {
        const valid = res.data;
        if (valid) {
          const blob = new Blob([formatted], { type: "application/xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "students.xml";
          a.click();
          URL.revokeObjectURL(url);
        } else {
          toast.error("Invalid data. Please correct the errors.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeStudentXml = (student) => {
    const dateOfBirth = student.birthDate.split("-");
    const issueDate = student.passportDateOfIssue.split("-");
    const expiryDate = student.passportDateOfExpiry.split("-");
    const validity = student.validity ? "valid" : "invalid";
    return `<student id="${student.id}">
          <name>
              <firstName>${capitalize(student.firstName)}</firstName>
              <lastName>${capitalize(student.lastName)}</lastName>
          </name>
          <dateOfBirth>
              <year>${dateOfBirth[0]}</year>
              <month>${dateOfBirth[1]}</month>
              <day>${dateOfBirth[2]}</day>
          </dateOfBirth>
          <placeOfBirth>${student.placeOfBirth}</placeOfBirth>
          <countryOfCitizenship>${capitalize(
            student.countryOfCitizenship
          )}</countryOfCitizenship>
          <gender>${String(student.gender).toLowerCase()}</gender>
          <passportNumber>${student.passportNumber}</passportNumber>
          <passportDateOfIssue>
              <year>${issueDate[0]}</year>
              <month>${issueDate[1]}</month>
              <day>${issueDate[2]}</day>
          </passportDateOfIssue>
          <passportDateOfExpiry>
              <year>${expiryDate[0]}</year>
              <month>${expiryDate[1]}</month>
              <day>${expiryDate[2]}</day>
          </passportDateOfExpiry>
          <status>${validity}</status>
      </student>  `;
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/students`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        const numberOfPages = Math.ceil(
          res.data.totalPages === 0 ? 1 : res.data.totalPages
        );
        setNumberOfPages(numberOfPages);
        setStudents(res.data.content);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("user");
          setUser(null);
          window.location.href = "/login";
        }
      });
  }, [deleted, isAddStudentActive]);

  const [searchCriteria, setSearchCriteria] = useState("");
  const handleSearchChange = () => {
    const crit = document.getElementById("table-search-users").value;
    const normalized = crit.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setSearchCriteria(normalized);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleExportXml = () => {
    exportXml(students, user.token, API_URL);
  };

  const handleExportJson = () => {
    exportJson(students, user.token, API_URL);
  };

  return (
    <div
      className="w-full h-full"
      style={{ backgroundColor: colorModeColors.bg }}
    >
      <div>
        {isEditActive && (
          <UserModalV2
            mode={"edit"}
            colorModeColors={colorModeColors}
            studentId={studentId}
            setStudentId={setStudentId}
            modalTitle={"Edit student"}
            buttonTitle={"Save changes"}
            isEditActive={isEditActive}
            setIsEditActive={setIsEditActive}
            API_URL={API_URL}
            setUser={setUser}
          />
        )}
        {isAddStudentActive && (
          <UserModalV2
            mode={"add"}
            colorModeColors={colorModeColors}
            modalTitle={"Add student"}
            buttonTitle={"Save"}
            isAddStudentActive={isAddStudentActive}
            setIsAddStudentActive={setIsAddStudentActive}
            API_URL={API_URL}
            setUser={setUser}
          />
        )}
      </div>
      <div className="flex h-24 mt-4 w-full">
        <div
          id="titleAndAdd"
          className="flex justify-between w-full items-center"
        >
          <div
            id="title"
            className="pl-14 text-4xl font-inter font-bold select-none"
            style={{ color: colorModeColors.title }}
          >
            List of students
          </div>
          <div className="flex gap-3">
            <div
              id="exportButton"
              className="flex items-center gap-2 pt-2 pb-2 pl-4 pr-4 border-2 rounded-xl hover:cursor-pointer"
              style={{
                borderColor: colorModeColors.buttonBorder,
                backgroundColor: colorModeColors.buttonBackGround,
              }}
              onClick={toggleDropdown}
            >
              <ExportIcon color={colorModeColors.icon} />
              <span
                className="font-inter font-semibold select-none"
                style={{ color: colorModeColors.buttonText }}
              >
                Export
              </span>
              {isDropdownVisible && (
                <div
                  className="absolute mt-36 py-2 w-48 rounded-md shadow-xl z-10"
                  style={{
                    backgroundColor: colorModeColors.buttonBackGround,
                    color: colorModeColors.buttonText,
                  }}
                >
                  <div
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={handleExportJson}
                  >
                    Export as JSON
                  </div>
                  <div
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={handleExportXml}
                  >
                    Export as XML
                  </div>
                </div>
              )}
            </div>
            <div
              id="addButton"
              className="flex items-center gap-2 mr-20 pt-2 pb-2 pl-4 pr-4 bg-creme rounded-xl hover:cursor-pointer shadow-xl"
              onClick={() => setIsAddStudentActive(true)}
            >
              <PlusIcon />
              <span className="font-inter font-semibold select-none">
                Add student
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="filtering"
        className="w-full h-20 flex justify-between items-start"
      >
        <div className="flex gap-3 pl-14">
          <input
            type="radio"
            id="all"
            name="status"
            value="All"
            className="hidden"
            defaultChecked
            onChange={handleStatusChange}
          />
          <label
            htmlFor="all"
            className="select-none pt-2 pb-2 pl-6 pr-6 rounded-xl font-inter font-medium shadow-md cursor-pointer"
            data-theme={currentTheme}
          >
            All
          </label>
          <input
            type="radio"
            id="valid"
            name="status"
            value="Valid"
            className="hidden"
            onChange={handleStatusChange}
          />
          <label
            htmlFor="valid"
            className="select-none pt-2 pb-2 pl-6 pr-6 rounded-xl font-inter font-medium shadow-md cursor-pointer"
            data-theme={currentTheme}
          >
            Valid
          </label>
          <input
            type="radio"
            id="invalid"
            name="status"
            value="Invalid"
            className="hidden"
            onChange={handleStatusChange}
          />
          <label
            htmlFor="invalid"
            className="select-none pt-2 pb-2 pl-6 pr-6 rounded-xl font-inter font-medium shadow-md cursor-pointer"
            data-theme={currentTheme}
          >
            Invalid
          </label>
        </div>
        <div className="flex items-center justify-between pr-20">
          <div className="relative">
            <div className="pl-5">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon color={colorModeColors.icon} />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-3 pl-9 text-sm font-inter font-medium text-gray-900 border-2 border-gray rounded-lg w-80"
              style={{
                borderColor: colorModeColors.buttonBorder,
                backgroundColor: colorModeColors.buttonBackGround,
                color: colorModeColors.inputText,
              }}
              placeholder="Search for students"
              onChange={handleSearchChange}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className="pl-14 pr-10 max-h-[68vh] overflow-y-auto">
        <table
          class="w-full border-2 rounded-xl border-separate border-spacing-0"
          style={{ borderColor: colorModeColors.tableBorder }}
        >
          <thead style={{ backgroundColor: colorModeColors.tableHeader }}>
            <tr className="select-none border-b-2 border-gray">
              <th className="text-left text-sm text-tableTextColor pl-5 font-inter font-semibold">
                ID
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                First name
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Last name
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Date of birth
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Place of birth
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Country of citizenship
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Gender
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Passport number
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 2xl:block xl:hidden font-inter font-semibold">
                Date of issue
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Date of expiry
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Status
              </th>
              <th className="text-left text-sm text-tableTextColor p-3 font-inter font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => {
                if (filter === "All") {
                  return student;
                } else if (filter === "Valid") {
                  return student.validity;
                } else {
                  return !student.validity;
                }
              })
              .filter((user) => {
                if (searchCriteria === "") {
                  return true;
                }
                const normalizedFullNameInternationalFormat =
                  `${user.firstName} ${user.lastName}`
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                const normalizedFullNameHungarianFormat =
                  `${user.lastName} ${user.firstName}`
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                const normalizedFirstName = user.firstName
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");

                const normalizedLastName = user.lastName
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");

                const normalizedPassportNumber = user.passportNumber
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");

                return (
                  normalizedPassportNumber
                    .toLowerCase()
                    .includes(searchCriteria) ||
                  normalizedFirstName.toLowerCase().includes(searchCriteria) ||
                  normalizedLastName.toLowerCase().includes(searchCriteria) ||
                  normalizedFullNameInternationalFormat
                    .toLowerCase()
                    .includes(searchCriteria) ||
                  normalizedFullNameHungarianFormat
                    .toLowerCase()
                    .includes(searchCriteria)
                );
              })
              .map((student) => (
                <tr key={student.id}>
                  <td
                    className="p-5 border-b-2 font-bold font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.id}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.firstName}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.lastName}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {mapDateToVerboseString(student.birthDate)}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.placeOfBirth}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.countryOfCitizenship}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.gender}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {student.passportNumber}
                  </td>
                  <td
                    className="p-5 border-b-2 2xl:block xl:hidden font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {mapDateToVerboseString(student.passportDateOfIssue)}
                  </td>
                  <td
                    className="p-5 border-b-2 font-inter h-18"
                    style={{
                      borderColor: colorModeColors.tableBorder,
                      color: colorModeColors.tableContent,
                    }}
                  >
                    {mapDateToVerboseString(student.passportDateOfExpiry)}
                  </td>
                  <td
                    className="p-3 border-b-2"
                    style={{ borderColor: colorModeColors.tableBorder }}
                  >
                    <Validity
                      validity={student.validity}
                      colorModeColors={colorModeColors}
                    />
                  </td>
                  <td
                    className="border-b-2 h-18"
                    style={{ borderColor: colorModeColors.tableBorder }}
                  >
                    <div className="flex gap-3 h-full items-center">
                      <EditIcon
                        color={colorModeColors.icon}
                        studentId={student.id}
                        setStudentId={setStudentId}
                        setIsEditActive={setIsEditActive}
                      />
                      <DeleteIcon
                        color={colorModeColors.icon}
                        studentId={student.id}
                        API_URL={API_URL}
                        deleted={deleted}
                        setDeleted={setDeleted}
                        user={user}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        numberOfPages={numberOfPages}
        colorModeColors={colorModeColors}
        activePage={activePage}
        setActivePage={setActivePage}
        setStudents={setStudents}
        setUser={setUser}
        API_URL={API_URL}
      />
    </div>
  );
};

export default StudentListContent;
