import React, { useEffect, useState } from "react";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";
import PageNumber from "./PageNumber";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Pagination = ({
  numberOfPages,
  colorModeColors,
  activePage,
  setActivePage,
  setStudents,
  setUser,
  API_URL,
}) => {
  const [pages, setPages] = useState([]);
  const handlePageClick = (e) => {
    const page = e.target.id.split("-")[1];
    axios
      .get(`${API_URL}/students?page=${page === 1 ? 0 : page - 1}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        setStudents(applyFilters(res.data.content));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("user");
          setUser(null);
          window.location.href = "/login";
        }
      });
    if (page !== "...") {
      setActivePage(parseInt(e.target.id.split("-")[1]));
    }
  };

  const applyFilters = (studentArray) => {
    const filters = JSON.parse(localStorage.getItem("filter"));
    if (!filters) {
      return studentArray;
    }
    return studentArray.filter((s) => {
      return (
        (filters.name === "" ||
          String(s.firstName + " " + s.lastName)
            .toLowerCase()
            .includes(filters.name.toLowerCase())) &&
        (filters.passportNumber === "" ||
          s.passportNumber.includes(filters.passportNumber)) &&
        (filters.birthDate.from === "" ||
          new Date(s.birthDate).getTime() >=
            new Date(filters.birthDate.from).getTime()) &&
        (filters.birthDate.to === "" ||
          new Date(s.birthDate).getTime() <=
            new Date(filters.birthDate.to).getTime()) &&
        (filters.placeOfBirth === "" ||
          s.placeOfBirth
            .toLowerCase()
            .includes(filters.placeOfBirth.toLowerCase())) &&
        (filters.gender === "" || s.gender === filters.gender) &&
        (filters.countryOfCitizenship === "" ||
          s.countryOfCitizenship
            .toLowerCase()
            .includes(filters.countryOfCitizenship.toLowerCase())) &&
        (filters.passportIssue.from === "" ||
          new Date(s.passportIssue.from).getTime() >=
            new Date(filters.passportIssueFrom).getTime()) &&
        (filters.passportIssue.to === "" ||
          new Date(s.passportIssue.to).getTime() <=
            new Date(filters.passportIssueTo).getTime()) &&
        (filters.passportExpiration.from === "" ||
          new Date(s.passportExpiration.from).getTime() >=
            new Date(filters.passportExpirationFrom).getTime()) &&
        (filters.passportExpiration.to === "" ||
          new Date(s.passportExpiration.to).getTime() <=
            new Date(filters.passportExpirationTo).getTime())
      );
    });
  };

  useEffect(() => {
    axios
      .get(
        `${API_URL}/students?page=${activePage === 1 ? 0 : activePage - 1}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      )
      .then((res) => {
        setStudents(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [activePage, setActivePage]);
  const populatePages = () => {
    const newPages = [];
    if (numberOfPages < 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        newPages.push(i);
      }
    } else {
      if (activePage < 3) {
        newPages.push(1, 2, 3, "...", numberOfPages);
      } else if (activePage > numberOfPages - 2) {
        newPages.push(
          1,
          "...",
          numberOfPages - 2,
          numberOfPages - 1,
          numberOfPages
        );
      } else {
        newPages.push(
          1,
          "...",
          activePage - 1,
          activePage,
          activePage + 1,
          "...",
          numberOfPages
        );
      }
    }
    setPages(newPages);
  };
  useEffect(() => {
    populatePages();
  }, [activePage, numberOfPages, setActivePage]);

  const [t, i18n] = useTranslation("global");
  return (
    <div className="h-14 flex justify-between pl-16 pr-16 pt-8 items-center">
      <button
        id="previous"
        className="font-inter font-semibold text-sm text-darkGray flex gap-2 items-center border-2 rounded-xl pt-2 pb-2 pl-4 pr-4"
        style={{
          backgroundColor: colorModeColors.buttonBackGround,
          borderColor: colorModeColors.buttonBorder,
          color: colorModeColors.buttonText,
        }}
        onClick={() => {
          if (activePage > 1) {
            setActivePage(activePage - 1);
          }
        }}
      >
        <LeftIcon color={colorModeColors.icon} />
        <span>{t("studentsPage.pagination.previous")}</span>
      </button>
      <div id="pages" className="flex gap-1">
        {pages.map((page) => (
          <PageNumber
            content={page}
            active={page === activePage}
            color={colorModeColors}
            onClick={handlePageClick}
          />
        ))}
      </div>
      <button
        id="next"
        className="font-inter font-semibold text-sm flex gap-2 items-center border-2 rounded-xl pt-2 pb-2 pl-4 pr-4"
        style={{
          backgroundColor: colorModeColors.buttonBackGround,
          borderColor: colorModeColors.buttonBorder,
          color: colorModeColors.buttonText,
        }}
        onClick={() => {
          if (activePage < numberOfPages) {
            setActivePage(activePage + 1);
          }
        }}
      >
        <span>{t("studentsPage.pagination.next")}</span>
        <RightIcon color={colorModeColors.icon} />
      </button>
    </div>
  );
};

export default Pagination;
