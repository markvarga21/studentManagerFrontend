import React, { useEffect, useState } from "react";
import FilterIcon from "../icons/FilterIcon";
import FilterModal from "../modals/FilterModal";
import { useTranslation } from "react-i18next";

const FilterButton = ({
  colors,
  students,
  setStudents,
  changed,
  setChanged,
  API_URL,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [t, i18n] = useTranslation("global");

  const [filterCount, setFilterCount] = useState(0);
  useEffect(() => {
    const filters = JSON.parse(localStorage.getItem("filter"));
    if (filters) {
      setFilterCount(calcFilterCount(filters));
    }
  }, [localStorage.getItem("filter")]);

  const calcFilterCount = (filterObj) => {
    const filterBools = [
      filterObj.name !== "",
      filterObj.passportNumber !== "",
      filterObj.birthdate.from !== "",
      filterObj.birthdate.to !== "",
      filterObj.placeOfBirth !== "",
      filterObj.gender !== "",
      filterObj.countryOfCitizenship !== "",
      filterObj.passportIssue.from !== "",
      filterObj.passportIssue.to !== "",
      filterObj.passportExpiration.from !== "",
      filterObj.passportExpiration.to !== "",
    ];
    return filterBools.reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <div>
      {isModalOpen && (
        <FilterModal
          colors={colors}
          setIsModalOpen={setIsModalOpen}
          students={students}
          setStudents={setStudents}
          changed={changed}
          setChanged={setChanged}
          API_URL={API_URL}
          setFilterCount={setFilterCount}
        />
      )}
      <div
        className="flex items-center gap-2 pt-2 pb-2 pl-4 pr-4 border-2 rounded-xl hover:cursor-pointer"
        style={{
          borderColor: colors.buttonBorder,
          backgroundColor: colors.buttonBackGround,
        }}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <FilterIcon color={colors.icon} />
        <span
          className="font-inter font-semibold select-none"
          style={{ color: colors.buttonText }}
        >
          {t("filterPanel.buttonTitle")}
        </span>
        {filterCount > 0 && (
          <div className="pl-2 pr-2 pt-1 pb-1 bg-creme rounded-lg text-sm font-semibold">
            {filterCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterButton;
