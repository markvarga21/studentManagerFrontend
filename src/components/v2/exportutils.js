import axios from "axios";
import toast from "react-hot-toast";
import formatXml from "xml-formatter";

export const exportJson = (data, token, API_URL) => {
  const json = JSON.stringify(data, null, 2);
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

export const exportXml = (data, token, API_URL) => {
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
  const issueDate = student.dateOfIssue.split("-");
  const expiryDate = student.dateOfExpiry.split("-");
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
          <dateOfIssue>
              <year>${issueDate[0]}</year>
              <month>${issueDate[1]}</month>
              <day>${issueDate[2]}</day>
          </dateOfIssue>
          <dateOfExpiry>
              <year>${expiryDate[0]}</year>
              <month>${expiryDate[1]}</month>
              <day>${expiryDate[2]}</day>
          </dateOfExpiry>
          <status>${validity}</status>
      </student>  `;
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
