import { useState } from "react";
import "./App.css";
import TableRow from "./components/TableRow";
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";
import UserFormModal from "./components/UserFormModal";
import FileInput from "./components/FileInput";

function App() {
  const [isFormActive, setIsFormActive] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    placeOfBirth: {
      city: "",
      street: "",
      number: 0,
    },
    nationality: "",
    gender: "",
    address: {
      city: "",
      street: "",
      number: 0,
    },
    email: "",
    phoneNumber: "",
  });
  const staticImageUrl =
    "https://st.depositphotos.com/2309453/4503/i/450/depositphotos_45030333-stock-photo-young-man-concentrating-as-he.jpg";

  const displayForm = () => {
    console.log("Displaying form!");
    setIsFormActive(!isFormActive);
  };

  const closeModal = () => {
    setIsFormActive(!isFormActive);
  };

  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...formData,
    };

    const addressType = String(fieldName).split("_")[0];
    if (addressType === "Birthplace" || addressType === "Address") {
      if (addressType === "Birthplace") {
        newFormData["placeOfBirth"][String(fieldName).split("_")[1]] =
          fieldValue;
        setFormData(newFormData);
      } else if (addressType === "Address") {
        newFormData["address"][String(fieldName).split("_")[1]] = fieldValue;
        setFormData(newFormData);
      } else {
        alert("Invalid address!");
      }
    } else {
      newFormData[fieldName] = fieldValue;
      console.log(newFormData[fieldName]);

      setFormData(newFormData);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log(`Saving ${logObject(formData)}`);
  };

  const logObject = (obj) => {
    let formObj = JSON.stringify(obj);
    formObj = JSON.stringify(obj, null, 4);

    return formObj;
  };

  const handleEditUser = (event) => {
    event.preventDefault();
    console.log(event.target.getAttribute("id"));
    setIsFormActive(!isFormActive);
  };

  const verifyIdentity = (event) => {
    event.preventDefault();
    console.log("verifying identity!");
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

        {isFormActive && (
          <UserFormModal
            closeModal={closeModal}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            verifyIdentity={verifyIdentity}
          />
        )}

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHead />
          <tbody>
            <TableRow
              id={1}
              userImageUrl={staticImageUrl}
              email={"asd@gmail.com"}
              name={"John Doe"}
              birthDate={"2001-01-01"}
              placeOfBirth={"Debrecen, Csapo 88"}
              nationality={"Hungarian"}
              gender={"male"}
              address={"Debrecen, Csapo 88"}
              phoneNumber={"20 970 1234"}
              handleEditUser={handleEditUser}
            />
            <TableRow
              id={2}
              userImageUrl={staticImageUrl}
              email={"asd@gmail.com"}
              name={"John Doe"}
              birthDate={"2001-01-01"}
              placeOfBirth={"Debrecen, Csapo 88"}
              nationality={"Hungarian"}
              gender={"male"}
              address={"Debrecen, Csapo 88"}
              phoneNumber={"20 970 1234"}
              handleEditUser={handleEditUser}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
