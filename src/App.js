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
import AddIcon from "./components/icons/AddIcon";
import ProfileIcon from "./components/icons/ProfileIcon";
import LogoutIcon from "./components/icons/LogoutIcon";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
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
    valid: 1,
  });
  const [userWasDeleted, setUserWasDeleted] = useState(1);

  const [isFillingData, setIsFillingData] = useState(false);
  const [fillingWasSuccessful, setFillingWasSuccessful] = useState(false);
  const [dataFromPassport, setDataFromPassport] = useState({});
  const fillFormDataFromPassport = () => {
    setIsFillingData(true);
    if (idPhoto === null) {
      toast.error("Please upload the passport!");
      return;
    }

    const loadingToast = toast.loading("Filling form data from passport...");
    const formToSend = new FormData();
    formToSend.append("passport", idPhoto);

    axios
      .post(
        `http://${process.env.REACT_APP_HOST}:8080/api/v1/form/extractData`,
        formToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.dismiss(loadingToast);
        setIsDataFilled(true);
        setIsFillingData(false);
        setFillingWasSuccessful(true);
        const user = res.data;
        console.log(`User form passport: ${JSON.stringify(user)}`);
        setDataFromPassport(user);
        delete user["id"];
        const keys = Object.keys(user);
        const temp = { ...formData };
        for (const key of keys) {
          const element = document.getElementById(key);
          if (element === null) {
            continue;
          }
          if (formData[key] === "") {
            element.value = user[key];
            temp[key] = user[key];
          }
        }
        setFormData(temp);
        toast.success("Data filled successfully!");
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        setIsDataFilled(true);
        setIsFillingData(false);
        setIdPhoto(null);
        toast.error("An error occured while filling the form!");
        console.error(err);
      });
  };

  useEffect(() => {
    if (idPhoto !== null && !isEditFormActive) {
      fillFormDataFromPassport();
    }
  }, idPhoto);

  const displayForm = () => {
    console.log("Displaying form!");
    setUserToEdit({});
    setIsFormActive(!isFormActive);
  };

  const closeModal = () => {
    setIsDataFilled(false);
    setDataFromPassport({});
    setErrorMessage({});
    setUserToEdit({});
    setIsErrorPresent(false);
    setIsFormActive(!isFormActive);
    setIdPhoto(null);
    setSelfiePhoto(null);
    setFillingWasSuccessful(false);
    setSelfieIsValid(false);
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
    setWhatWasChanged("NOTHING");
  };

  const closeEditModal = () => {
    setErrorMessage({});
    setUserToEdit({});
    setIsErrorPresent(false);
    setIsEditFormActive(false);
    setIdPhoto(null);
    setSelfiePhoto(null);
    setWhatWasChanged("NOTHING");
  };

  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...formData,
    };

    setErrorMessage({});
    setIsErrorPresent(false);
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

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

  const [isDataFilled, setIsDataFilled] = useState(false);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Saving form data!");
    if (idPhoto === null || selfiePhoto === null) {
      if (idPhoto == null) {
        toast.error("Please upload the passport!");
      } else {
        toast.error("Please upload the selfie!");
      }
    } else {
      setErrorMessage({});
      setIsErrorPresent(false);
      setIsSaving(true);
      const uppercase_gender = String(formData.gender).toUpperCase();
      formData.gender = uppercase_gender;
      const userJson = JSON.stringify(formData);
      console.log(`Saving ${logObject(userJson)}`);

      axios
        .post(
          `http://${process.env.REACT_APP_HOST}:8080/api/v1/students`,
          formData,
          {}
        )
        .then((savePromiseResult) => {
          setIsDataFilled(false);
          setIsErrorPresent(false);
          setIsSaving(false);
          setIsFormActive(false);
          setUserToEdit({});
          setIdPhoto(null);
          setSelfiePhoto(null);
          setSelfieIsValid(false);
          setFillingWasSuccessful(false);
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

          if (Object.keys(dataFromPassport).length !== 0) {
            console.log(
              "Saving validation data: " + JSON.stringify(dataFromPassport)
            );
            axios
              .post(
                `http://${process.env.REACT_APP_HOST}:8080/api/v1/validations`,
                dataFromPassport
              )
              .then(() => {})
              .catch((err) => console.error(err));
          }

          const imageForm = new FormData();
          imageForm.append("passport", idPhoto);
          imageForm.append("selfie", selfiePhoto);
          const savedUserId = savePromiseResult.data.id;
          console.log("Saved user id: " + savedUserId);

          axios
            .post(
              `http://${process.env.REACT_APP_HOST}:8080/api/v1/files/upload/${savedUserId}`,
              imageForm,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(() => {})
            .catch((err) => console.error(err));

          toast.success("User saved successfully!");
        })
        .catch((err) => {
          setIsDataFilled(true);
          setIsSaving(false);
          console.error(err);
          if (err.response != null) {
            const errorMessage = err.response.data.message;
            const errWordCount = errorMessage.split(" ").length;
            const errorPanelDuration = (errWordCount * 1000) / 3;
            toast.error(errorMessage, { duration: errorPanelDuration });
          }
        });
    }
  };

  const passportDataEqualsForm = (passportData, formData) => {
    console.log("Checking if passport data equals form data!");
    const keys = Object.keys(passportData);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "id") {
        continue;
      }
      let passValue = String(passportData[keys[i]]);
      let formValue = String(formData[keys[i]]);

      if (passValue === undefined || passValue === null) {
        console.log("Pass value is undefined or null!");
        return false;
      }
      if (passValue.toLowerCase() !== formValue.toLowerCase()) {
        console.log(
          `Pass value: ${passValue} and form value: ${formValue} are not equal!`
        );
        return false;
      }
    }
    return true;
  };

  const [userWasUpdated, setUserWasUpdated] = useState(1);
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Updating user with passport number: ${userToEdit.passportNumber}`
    );

    setIsSaving(true);
    const userGender = String(userToEdit.gender);
    userToEdit.gender = userGender.toUpperCase();
    const userJson = JSON.stringify(userToEdit);
    console.log(`Updating ${logObject(userJson)}`);

    console.log(`Edit id: ${userToEdit.id}`);

    axios
      .put(
        `http://${process.env.REACT_APP_HOST}:8080/api/v1/students/${userToEdit.id}`,
        userToEdit
      )
      .then((res) => {
        toast.success(`User with id '${userToEdit.id}' updated successfully!`);
        setIsErrorPresent(false);
        setIsSaving(false);
        setSelfieIsValid(false);
        setFillingWasSuccessful(false);
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
        setUserWasUpdated(-1 * userWasUpdated);

        axios
          .get(
            `http://${process.env.REACT_APP_HOST}:8080/api/v1/validations/${userToEdit.passportNumber}`
          )
          .then((res) => {
            const passportData = res.data;
            if (res.data === null) {
              console.log("Passport data is null!");
              return;
            }
            if (passportDataEqualsForm(passportData, userToEdit)) {
              console.log(
                "Passport data equals form data, validating automatically!"
              );
              axios
                .post(
                  `http://${process.env.REACT_APP_HOST}:8080/api/v1/validations/validateManually?studentId=${userToEdit.id}`
                )
                .then((response) => {
                  console.log(
                    "Student validated successfully! " + response.data
                  );
                  toast.success("Student validated successfully!");
                  setUserWasValidated(-1 * userWasValidated);
                })
                .catch((err) => {
                  console.error(err);
                  // if the selfie is not similar to the passport photo
                  toast.error("An error occured while validating the student!");
                });
            }
          });
      })
      .catch((err) => {
        setIsSaving(false);
        console.error(err);
        if (err.response != null) {
          const errorMessage = err.response.data.message;
          const errWordCount = errorMessage.split(" ").length;
          const errorPanelDuration = (errWordCount * 1000) / 3;
          toast.error(errorMessage, { duration: errorPanelDuration });
        }
      });
  };

  const [userWasValidated, setUserWasValidated] = useState(1);
  const [fileWasChanged, setFileWasChanged] = useState(1);
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_HOST}:8080/api/v1/students`)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [formData, isSaving, userWasDeleted, userWasValidated, fileWasChanged]);

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

  const [editWasClicked, setEditWasClicked] = useState(1);
  const handleEditUser = (event) => {
    event.preventDefault();
    const editId = Number(event.target.getAttribute("id"));
    const user = userList.find((user) => user.id === editId);
    setIsFillingData(false);
    setUserToEdit(user);
    setIsEditFormActive(true);
    setEditWasClicked(-1 * editWasClicked);
  };

  const [whatWasChanged, setWhatWasChanged] = useState("NOTHING");
  const handleIdPhotoChange = (event) => {
    event.preventDefault();
    setIsFillingData(true);
    const file = event.target.files[0];
    console.log(file + " " + typeof file);
    toast.success("Passport uploaded successfully!");
    setIdPhoto(file);
    setWhatWasChanged("PASSPORT");
  };

  const [selfieIsValid, setSelfieIsValid] = useState(false);
  const handleSelfiePhotoChange = (event) => {
    toast.success("Selfie uploaded successfully!");
    event.preventDefault();
    const file = event.target.files[0];
    setSelfiePhoto(file);
    setWhatWasChanged("SELFIE");
  };

  const handleDeleteUser = (event) => {
    const userToDeleteId = event.target.id;

    axios
      .delete(
        `http://${process.env.REACT_APP_HOST}:8080/api/v1/students/${userToDeleteId}`
      )
      .then((res) => {
        setIsFillingData(false);
        setUserWasDeleted(-1 * userWasDeleted);
        toast.success(
          `User with id: '${userToDeleteId}' deleted successfully!`
        );
      })
      .catch((err) => {
        if (err.response != null) {
          const errorMessage = err.response.data.message;
          console.error(err);
          //toast.error(errorMessage);
        }
      });
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
        if (criteria === "valid") {
          if (a[criteria] === b[criteria]) {
            return 0;
          } else if (a[criteria] === true) {
            return 1 * order;
          } else {
            return -1 * order;
          }
        }
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
    const keys = Object.keys(userToEdit);

    let newInvalidFields = { ...invalidFields };
    for (let i = 0; i < keys.length; i++) {
      let passValue = String(passportData[keys[i]]);
      let editValue = String(userToEdit[keys[i]]);

      if (passValue === undefined || passValue === null || passValue === "") {
        newInvalidFields[keys[i]] = false;
        continue;
      }
      if (editValue.toLowerCase() !== passValue.toLowerCase()) {
        newInvalidFields[keys[i]] = true;
      }
    }
    setInvalidFields(newInvalidFields);
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
            <div className="flex mr-5 gap-3">
              <ProfileIcon email={loginEmail} />
              <div className="flex-col">
                <div
                  className="flex gap-1 items-center hover:underline hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  Logout
                </div>
                <div className="text-gray-500">{loginEmail}</div>
              </div>
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
              setSelfiePhoto={setSelfiePhoto}
              isFillingData={isFillingData}
              fillingWasSuccessful={fillingWasSuccessful}
              actualUser={formData}
              setSelfieIsValid={setSelfieIsValid}
              selfieIsValid={selfieIsValid}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
              setIdPhoto={setIdPhoto}
              userWasValidated={userWasValidated}
              setUserWasValidated={setUserWasValidated}
              formData={formData}
              setPassportData={setPassportData}
              handleInvalidPassport={handleInvalidPassport}
              userToEdit={userToEdit}
              setUserToEdit={setUserToEdit}
              userWasUpdated={userWasUpdated}
              editWasClicked={editWasClicked}
              setWhatWasChanged={setWhatWasChanged}
              whatWasChanged={whatWasChanged}
              fileWasChanged={fileWasChanged}
              setFileWasChanged={setFileWasChanged}
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
              setSelfiePhoto={setSelfiePhoto}
              isFillingData={isFillingData}
              fillingWasSuccessful={fillingWasSuccessful}
              actualUser={formData}
              setSelfieIsValid={setSelfieIsValid}
              selfieIsValid={selfieIsValid}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              passportData={passportData}
              setFormData={setFormData}
              whatWasChanged={whatWasChanged}
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
                    valid={user.valid}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                  />
                ))}
            </tbody>
          </table>
          <Toaster />
        </div>
      ) : (
        <Login setIsUserLogin={setIsUserLogin} setLoginEmail={setLoginEmail} />
      )}
    </div>
  );
}

export default App;
