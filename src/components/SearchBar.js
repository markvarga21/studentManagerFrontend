import React from "react";

const SearchBar = ({ setSearchValue }) => {
  const handleSearchBarValueChange = (event) => {
    const name = event.target.value;
    const normalizedName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setSearchValue(normalizedName);
  };
  return (
    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-5">
      <div className="relative">
        <div className="pl-5">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search-users"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for users"
          onChange={handleSearchBarValueChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
