import { useState } from "react";
import "./App.css";
import TableRow from "./components/TableRow";
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";

function App() {
  const [isFormActive, setIsFormActive] = useState(false);
  const staticImageUrl =
    "https://st.depositphotos.com/2309453/4503/i/450/depositphotos_45030333-stock-photo-young-man-concentrating-as-he.jpg";

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <SearchBar />
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
