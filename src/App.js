import { useState } from "react";
import "./App.css";
import TableRow from "./components/TableRow";
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";
import UserFormModal from "./components/UserFormModal";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    placeOfBirth: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
    nationality: "",
    gender: "",
    address: {
      country: "",
      city: "",
      street: "",
      number: 0,
    },
    email: "",
    phoneNumber: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isErrorPresent, setIsErrorPresent] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    details: "",
  });
  const [isFormActive, setIsFormActive] = useState(false);
  const [idPhoto, setIdPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);

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
    if (idPhoto === null || selfiePhoto === null) {
      if (idPhoto == null) {
        alert("Upload the ID/passport!");
      } else {
        alert("Upload the selfie!");
      }
    } else {
      setIsSaving(true);
      const userJson = JSON.stringify(formData);
      console.log(`Saving ${logObject(userJson)}`);

      const formToSend = new FormData();
      formToSend.append("idDocument", idPhoto);
      formToSend.append("selfiePhoto", selfiePhoto);
      formToSend.append("appUserJson", userJson);
      formToSend.append("identification", "idCard");

      axios
        .post("http://localhost:8080/api/v1/users", formToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setIsErrorPresent(false);
          setIsSaving(false);
          setIsFormActive(false);
        })
        .catch((err) => {
          setIsSaving(false);
          console.error(err);
          if (err.response != null) {
            const errorMessage = err.response.data.message;
            const errorOperationType = err.response.data.operationType;
            setErrorMessage({
              title: `${errorOperationType} ERROR`,
              details: errorMessage,
            });
            setIsErrorPresent(true);
          }
        });
    }
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

  const handleIdPhotoChange = (event) => {
    console.log("ID photo changed!");
    event.preventDefault();
    const file = event.target.files[0];
    setIdPhoto(file);
  };

  const handleSelfiePhotoChange = (event) => {
    console.log("Selfie photo changed!");
    event.preventDefault();
    const file = event.target.files[0];
    setSelfiePhoto(file);
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
            handleIdPhotoChange={handleIdPhotoChange}
            handleSelfiePhotoChange={handleSelfiePhotoChange}
            isSaving={isSaving}
            isErrorPresent={isErrorPresent}
            errorMessage={errorMessage}
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
