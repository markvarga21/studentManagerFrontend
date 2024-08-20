import React, { useEffect, useState } from "react";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";
import PageNumber from "./PageNumber";
import axios from "axios";

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
        setStudents(res.data.content);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("user");
          setUser(null);
          window.location.href = "/auth";
        }
      });
    if (page !== "...") {
      setActivePage(parseInt(e.target.id.split("-")[1]));
    }
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
        <span>Previous</span>
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
        <span>Next</span>
        <RightIcon color={colorModeColors.icon} />
      </button>
    </div>
  );
};

export default Pagination;
