import { useEffect, useState } from "react";
import "./App.css";
import TableRow from "./components/table/TableRow";
import SearchBar from "./components/inputs/SearchBar";
import TableHead from "./components/table/TableHead";
import UserFormModal from "./components/modals/UserFormModal";
import axios from "axios";
import UserEditFormModal from "./components/modals/UserEditFormModal";
import { auth } from "./firebase";
import Login from "./components/login/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import CustomButton from "./components/buttons/CustomButton";
import LogoutButton from "./components/login/LogoutButton";
import AddIcon from "./components/icons/AddIcon";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    placeOfBirth: "",
    countryOfCitizenship: "",
    gender: "",
    passportNumber: "",
    passportDateOfExpiry: "",
    passportDateOfIssue: "",
  });
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userToEdit, setUserToEdit] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isErrorPresent, setIsErrorPresent] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    details: "",
  });
  const [isFormActive, setIsFormActive] = useState(false);
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [idPhoto, setIdPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [sortByCriteria, setSortByCriteria] = useState("nosort");
  const [sortingOrder, setSortingOrder] = useState({
    firstName: 1,
    lastName: 1,
    birthDate: 1,
    placeOfBirth: 1,
    countryOfCitizenship: 1,
    gender: 1,
    passportNumber: 1,
    passportDateOfExpiry: 1,
    passportDateOfIssue: 1,
  });
  const [useWasDeleted, setUserWasDeleted] = useState(1);

  const [isFillingData, setIsFillingData] = useState(false);
  const [fillingWasSuccessful, setFillingWasSuccessful] = useState(false);
  const handleFillFormData = (event) => {
    event.preventDefault();
    setIsFillingData(true);
    console.log("Filling form data!");

    const formToSend = new FormData();
    formToSend.append("passport", idPhoto);

    axios
      .post("http://localhost:8080/api/v1/form/extractData", formToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsFillingData(false);
        setFillingWasSuccessful(true);
        const user = res.data;
        delete user["id"];
        const keys = Object.keys(user);
        for (const key of keys) {
          const element = document.getElementById(key);
          if (element !== null) {
            element.value = user[key];
          }
        }
        setFormData(user);
        toast.success("Data filled successfully!");
      })
      .catch((err) => {
        setIsFillingData(false);
        toast.error("An error occured while filling the form!");
        console.error(err);
      });
  };

  const displayForm = () => {
    console.log("Displaying form!");
    setUserToEdit({});
    setIsFormActive(!isFormActive);
  };

  const closeModal = () => {
    setErrorMessage({});
    setUserToEdit({});
    setIsErrorPresent(false);
    setIsFormActive(!isFormActive);
    setIdPhoto(null);
    setSelfiePhoto(null);
    setFillingWasSuccessful(false);
    setSelfieIsValid(false);
    setPassportIsValid(false);
    setPassportIsValidating(false);
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      placeOfBirth: "",
      countryOfCitizenship: "",
      gender: "",
      passportNumber: "",
      passportDateOfExpiry: "",
      passportDateOfIssue: "",
    });
    setInvalidFields({
      firstName: false,
      lastName: false,
      birthDate: false,
      placeOfBirth: false,
      countryOfCitizenship: false,
      gender: false,
      passportNumber: false,
      passportDateOfExpiry: false,
      passportDateOfIssue: false,
    });
    setPassportData({
      firstName: "",
      lastName: "",
      birthDate: "",
      placeOfBirth: "",
      countryOfCitizenship: "",
      gender: "",
      passportNumber: "",
      passportDateOfExpiry: "",
      passportDateOfIssue: "",
    });
  };

  const closeEditModal = () => {
    setErrorMessage({});
    setUserToEdit({});
    setIsErrorPresent(false);
    setIsEditFormActive(false);
    setIdPhoto(null);
    setSelfiePhoto(null);
  };

  const handleFormChange = (event) => {
    event.preventDefault();
    setPassportIsValid(false);
    setPassportIsValidating(false);

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...formData,
    };

    setErrorMessage({});
    setIsErrorPresent(false);
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
    console.log(formData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    console.log("Handling edit form change!");

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...userToEdit,
    };

    setErrorMessage({});
    setIsErrorPresent(false);
    newFormData[fieldName] = fieldValue;
    console.log(newFormData[fieldName]);

    setUserToEdit(newFormData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Saving form data!");
    if (idPhoto === null || selfiePhoto === null) {
      if (idPhoto == null) {
        toast.error("Upload the passport!");
      } else {
        toast.error("Upload the portrait!");
      }
    } else if (!selfieIsValid || !passportIsValid) {
      if (!selfieIsValid) {
        toast.error("Selfie is invalid!");
      } else {
        toast.error("Passport is invalid!");
      }
    } else {
      setErrorMessage({});
      setIsErrorPresent(false);
      setIsSaving(true);
      const uppercase_gender = String(formData.gender).toUpperCase();
      formData.gender = uppercase_gender;
      const userJson = JSON.stringify(formData);
      console.log(`Saving ${logObject(userJson)}`);

      const formToSend = new FormData();
      formToSend.append("studentJson", userJson);

      axios
        .post("http://localhost:8080/api/v1/students", formToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setIsErrorPresent(false);
          setIsSaving(false);
          setIsFormActive(false);
          setUserToEdit({});
          setIdPhoto(null);
          setSelfiePhoto(null);
          setPassportIsValid(false);
          setSelfieIsValid(false);
          setFillingWasSuccessful(false);
          toast.success("User saved successfully!");
        })
        .catch((err) => {
          setIsSaving(false);
          console.error(err);
          if (err.response != null) {
            const errorMessage = err.response.data.message;
            toast.error(errorMessage);
          }
        });
    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log(userToEdit);
    if (idPhoto === null || selfiePhoto === null) {
      if (idPhoto == null) {
        toast.error("Upload the passport!");
      } else {
        toast.error("Upload the portrait!");
      }
    } else {
      setIsSaving(true);
      const userJson = JSON.stringify(userToEdit);
      console.log(`Saving ${logObject(userJson)}`);

      const formToSend = new FormData();
      formToSend.append("studentJson", userJson);

      axios
        .put(
          `http://localhost:8080/api/v1/students/${userToEdit.id}`,
          formToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setIsErrorPresent(false);
          setIsSaving(false);
          setIsEditFormActive(false);
          setUserToEdit({});
          setIdPhoto(null);
          setSelfiePhoto(null);
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/students")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [formData, isSaving, useWasDeleted]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoginEmail(user.email || "");
      } else {
        setLoginEmail("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logObject = (obj) => {
    let formObj = JSON.stringify(obj);
    formObj = JSON.stringify(obj, null, 4);

    return formObj;
  };

  const handleEditUser = (event) => {
    event.preventDefault();
    const editId = Number(event.target.getAttribute("id"));
    const user = userList.find((user) => user.id === editId);
    setUserToEdit(user);
    setIsEditFormActive(true);
  };

  const handleIdPhotoChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    toast.success("Passport uploaded successfully!");
    setIdPhoto(file);
  };

  const [selfieIsValid, setSelfieIsValid] = useState(false);
  const handleSelfiePhotoChange = (event) => {
    toast.success("Portrait uploaded successfully!");
    event.preventDefault();
    const file = event.target.files[0];
    setSelfiePhoto(file);
  };

  const handleDeleteUser = (event) => {
    const userToDeleteId = event.target.id;

    axios
      .delete(`http://localhost:8080/api/v1/students/${userToDeleteId}`)
      .then((res) => {
        setUserWasDeleted(-1 * useWasDeleted);
        toast.success(
          `User with id: '${userToDeleteId}' deleted successfully!`
        );
      })
      .catch((err) => {
        if (err.response != null) {
          const errorMessage = err.response.data.message;
          console.error(err);
          toast.error(errorMessage);
        }
      });
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    signOutUser();
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setLoginEmail("");
        console.log("User loggout out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortItems = (criteria, order) => {
    try {
      const newSortedList = [...userList].sort((a, b) => {
        return a[criteria].localeCompare(b[criteria]) * order;
      });
      setUserList(newSortedList);
    } catch (err) {
      console.error(err);
    }
  };

  const [invalidFields, setInvalidFields] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    placeOfBirth: false,
    countryOfCitizenship: false,
    gender: false,
    passportNumber: false,
    passportDateOfExpiry: false,
    passportDateOfIssue: false,
  });

  const [passportData, setPassportData] = useState({
    firstName: false,
    lastName: "",
    birthDate: "",
    placeOfBirth: "",
    countryOfCitizenship: "",
    gender: "",
    passportNumber: "",
    passportDateOfExpiry: "",
    passportDateOfIssue: "",
  });
  const handleInvalidPassport = (passportData) => {
    console.log("Handling invalid passport!");
    const keys = Object.keys(formData);

    let newInvalidFields = { ...invalidFields };
    for (let i = 0; i < keys.length; i++) {
      if (
        formData[keys[i]].toLowerCase() !== passportData[keys[i]].toLowerCase()
      ) {
        newInvalidFields[keys[i]] = true;
      }
    }
    setInvalidFields(newInvalidFields);
  };

  const [passportIsValid, setPassportIsValid] = useState(false);
  const [passportIsValidating, setPassportIsValidating] = useState(false);
  const validatePassport = (e) => {
    e.preventDefault();

    setPassportIsValidating(true);

    const formToSend = new FormData();
    formToSend.append("passport", idPhoto);

    const values = Object.values(formData);
    const editUserInfoFields = Object.values(userToEdit);
    if (values.includes("")) {
      if (editUserInfoFields.includes("")) {
        setPassportIsValidating(false);
        toast.error("Please fill all the input fields!");
        return;
      } else {
        formToSend.append("studentJson", JSON.stringify(userToEdit));
      }
    } else {
      formToSend.append("studentJson", JSON.stringify(formData));
    }

    axios
      .post("http://localhost:8080/api/v1/form/validate", formToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const response = res.data;
        if (response.isValid) {
          setPassportIsValid(true);
          //setPassportIsValidating(false);
          toast.success("Passport is valid!");
          setInvalidFields({
            firstName: false,
            lastName: false,
            birthDate: false,
            placeOfBirth: false,
            countryOfCitizenship: false,
            gender: false,
            passportNumber: false,
            passportDateOfExpiry: false,
            passportDateOfIssue: false,
          });
          setPassportData({
            firstName: "",
            lastName: "",
            birthDate: "",
            placeOfBirth: "",
            countryOfCitizenship: "",
            gender: "",
            passportNumber: "",
            passportDateOfExpiry: "",
            passportDateOfIssue: "",
          });
        } else {
          toast.error("Passport validation unsuccessful!");
          const passportData = response.studentDto;
          setPassportData(passportData);
          handleInvalidPassport(passportData);
          setPassportIsValid(false);
          setPassportIsValidating(false);
        }
      })
      .catch((err) => {
        toast.error("An error occured while validating passport!");
        console.error(err);
        setPassportIsValid(false);
        setPassportIsValidating(false);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in!");
        setIsUserLogin(true);
      } else {
        console.log("User is not logged in!");
        setIsUserLogin(false);
      }
    });
  }, []);

  return (
    <div>
      {isUserLogin === true ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <SearchBar setSearchValue={setSearchValue} />
              <CustomButton
                text={"Add new student"}
                isLoading={false}
                isDisabled={false}
                handleButtonClick={displayForm}
                customIcon={<AddIcon />}
              />
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col items-end px-5 relative">
                <p className="text-lg font-thin text-gray-500 lg:text-xl">
                  Currently logged in as
                </p>
                <div
                  className="hover:underline hover:text-uniGreen cursor-pointer"
                  onClick={handleDropdownClick}
                >
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">
                    {loginEmail}
                  </h1>
                </div>
              </div>
              <LogoutButton handleLogout={handleLogout} />
            </div>
          </div>

          {isEditFormActive && (
            <UserEditFormModal
              title={"Edit existing data"}
              closeModal={closeEditModal}
              handleEditFormChange={handleEditFormChange}
              handleFormSubmit={handleEditFormSubmit}
              handleIdPhotoChange={handleIdPhotoChange}
              handleSelfiePhotoChange={handleSelfiePhotoChange}
              isSaving={isSaving}
              isErrorPresent={isErrorPresent}
              errorMessage={errorMessage}
              editUserInfo={userToEdit}
              idPhoto={idPhoto}
              selfiePhoto={selfiePhoto}
              handleFillFormData={handleFillFormData}
              setSelfiePhoto={setSelfiePhoto}
              isFillingData={isFillingData}
              fillingWasSuccessful={fillingWasSuccessful}
              validatePassport={validatePassport}
              actualUser={formData}
              setSelfieIsValid={setSelfieIsValid}
              selfieIsValid={selfieIsValid}
              passportIsValidating={passportIsValidating}
              passportIsValid={passportIsValid}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
            />
          )}

          {isFormActive && (
            <UserFormModal
              title={"Add details of the user to save"}
              closeModal={closeModal}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
              handleIdPhotoChange={handleIdPhotoChange}
              handleSelfiePhotoChange={handleSelfiePhotoChange}
              isSaving={isSaving}
              isErrorPresent={isErrorPresent}
              errorMessage={errorMessage}
              idPhoto={idPhoto}
              selfiePhoto={selfiePhoto}
              handleFillFormData={handleFillFormData}
              setSelfiePhoto={setSelfiePhoto}
              isFillingData={isFillingData}
              fillingWasSuccessful={fillingWasSuccessful}
              validatePassport={validatePassport}
              actualUser={formData}
              setSelfieIsValid={setSelfieIsValid}
              selfieIsValid={selfieIsValid}
              passportIsValidating={passportIsValidating}
              passportIsValid={passportIsValid}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
            />
          )}

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <TableHead
              sortingCriteria={sortByCriteria}
              setSortByCriteria={setSortByCriteria}
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              sortItems={sortItems}
            />
            <tbody>
              {userList
                .filter((user) => {
                  if (searchValue === "") {
                    return true;
                  }
                  const normalizedFullNameInternationalFormat =
                    `${user.firstName} ${user.lastName}`
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "");

                  const normalizedFullNameHungarianFormat =
                    `${user.lastName} ${user.firstName}`
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "");

                  const normalizedFirstName = user.firstName
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                  const normalizedLastName = user.lastName
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                  return (
                    normalizedFirstName.toLowerCase().includes(searchValue) ||
                    normalizedLastName.toLowerCase().includes(searchValue) ||
                    normalizedFullNameInternationalFormat
                      .toLowerCase()
                      .includes(searchValue) ||
                    normalizedFullNameHungarianFormat
                      .toLowerCase()
                      .includes(searchValue)
                  );
                })
                .map((user) => (
                  <TableRow
                    key={user.id}
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    birthDate={user.birthDate}
                    placeOfBirth={user.placeOfBirth}
                    countryOfCitizenship={user.countryOfCitizenship}
                    gender={user.gender}
                    phoneNumber={user.phoneNumber}
                    passportNumber={user.passportNumber}
                    passportDateOfExpiry={user.passportDateOfExpiry}
                    passportDateOfIssue={user.passportDateOfIssue}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                  />
                ))}
            </tbody>
          </table>
          <Toaster />
        </div>
      ) : (
        <Login
          setIsUserLogin={setIsUserLogin}
          setLoginEmail={setLoginEmail}
          setDropdownOpen={setDropdownOpen}
        />
      )}
    </div>
  );
}

export default App;
