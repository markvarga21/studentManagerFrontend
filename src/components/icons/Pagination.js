import React, { useEffect, useState } from "react";
import LeftIcon from "./LeftIcon";
import RightIcon from "./RightIcon";
import PageNumber from "./PageNumber";

const Pagination = ({
  numberOfPages,
  colorModeColors,
  activePage,
  setActivePage,
}) => {
  const [pages, setPages] = useState([]);
  const handlePageClick = (e) => {
    const page = e.target.id.split("-")[1];
    if (page !== "...") {
      setActivePage(parseInt(e.target.id.split("-")[1]));
    }
  };
  const populatePages = () => {
    const newPages = []; // Initialize a new array to hold the page numbers
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
    setPages(newPages); // Update the state with the new array
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
        <spam>Previous</spam>
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
        <spam>Next</spam>
        <RightIcon color={colorModeColors.icon} />
      </button>
    </div>
  );
};

export default Pagination;
