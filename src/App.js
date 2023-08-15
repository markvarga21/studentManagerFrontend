import { useState } from "react";
import "./App.css";
import TableRow from "./components/TableRow";
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";
import UserFormModal from "./components/UserFormModal";

function App() {
  const [isFormActive, setIsFormActive] = useState(false);
  const staticImageUrl =
    "https://st.depositphotos.com/2309453/4503/i/450/depositphotos_45030333-stock-photo-young-man-concentrating-as-he.jpg";

  const displayForm = () => {
    console.log("Displaying form!");
    setIsFormActive(!isFormActive);
  };

  const closeModal = () => {
    setIsFormActive(!isFormActive);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <div className="flex items-center">
          <SearchBar />
          <button
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={displayForm}
          >
            Add user
          </button>
        </div>

        {isFormActive && <UserFormModal closeModal={closeModal} />}

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead />
          <tbody>
            <TableRow
              userImageUrl={staticImageUrl}
              email={"asd@gmail.com"}
              status={"online"}
            />
            <TableRow
              userImageUrl={staticImageUrl}
              email={"asd@gmail.com"}
              status={"online"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
