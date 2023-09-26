import { useEffect, useState } from "react";
import "./App.css";
import TableRow from "./components/TableRow";
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";
import UserFormModal from "./components/UserFormModal";
import axios from "axios";
import UserEditFormModal from "./components/UserEditFormModal";
import {
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import { auth, storage } from "./firebase";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
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
    countryOfCitizenship: "",
    gender: "",
    email: "",
    phoneNumber: "",
    passportNumber: "",
    passportDateOfExpiry: "",
    passportDateOfIssue: "",
  });
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userSelfies, setUserSelfies] = useState([]);
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
  const [userWasDeleted, setUserWasDeleted] = useState(-1);

  const staticImageUrl =
    "https://st.depositphotos.com/2309453/4503/i/450/depositphotos_45030333-stock-photo-young-man-concentrating-as-he.jpg";

  const imageListRef = ref(storage, "images/");
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item)
          .then((url) => {
            const nameStartIndex = url.indexOf("selfie");
            const nameEndIndex = url.indexOf(".jpg");
            const fileName = url.substring(nameStartIndex, nameEndIndex);
            const fileId = fileName.split("_")[1];
            const imageItem = {
              id: fileId,
              fileUrl: url,
            };
            setUserSelfies((prev) => [...prev, imageItem]);
          })
          .catch((err) => console.error(err));
      });
    });
  }, [formData, isSaving, userWasDeleted, isFormActive, isEditFormActive]);

  const NOT_FOUND_IMAGE_URL =
    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
  const getImageUrlForId = (userId) => {
    const imageItem = userSelfies.find((item) => item.id === String(userId));
    if (imageItem === undefined) {
      return NOT_FOUND_IMAGE_URL;
    }
    return imageItem.fileUrl;
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
  };

  const closeEditModal = () => {
    setErrorMessage({});
    setUserToEdit({});
    setIsErrorPresent(false);
    setIsEditFormActive(false);
    setIdPhoto(null);
  };

  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...formData,
    };

    const addressType = String(fieldName).split("_")[0];
    if (addressType === "Birthplace") {
      if (addressType === "Birthplace") {
        newFormData["placeOfBirth"][String(fieldName).split("_")[1]] =
          fieldValue;
        setFormData(newFormData);
      } else {
        setErrorMessage({
          title: "INVALID ADDRESS",
          details: "The address you've entered is invalid!",
        });
        setIsErrorPresent(true);
      }
    } else {
      setErrorMessage({});
      setIsErrorPresent(false);
      newFormData[fieldName] = fieldValue;
      console.log(newFormData[fieldName]);

      setFormData(newFormData);
    }
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {
      ...userToEdit,
    };

    const addressType = String(fieldName).split("_")[0];
    if (addressType === "Birthplace") {
      if (addressType === "Birthplace") {
        newFormData["placeOfBirth"][String(fieldName).split("_")[1]] =
          fieldValue;
        setUserToEdit(newFormData);
      } else {
        setErrorMessage({
          title: "INVALID ADDRESS",
          details: "The address you've entered is invalid!",
        });
        setIsErrorPresent(true);
      }
    } else {
      setErrorMessage({});
      setIsErrorPresent(false);
      newFormData[fieldName] = fieldValue;
      console.log(newFormData[fieldName]);

      setUserToEdit(newFormData);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (idPhoto === null || selfiePhoto === null) {
      if (idPhoto == null) {
        setErrorMessage({
          title: "MISSING ID DOCUMENT",
          details: "Upload the ID document!",
        });
        setIsErrorPresent(true);
      } else {
        setErrorMessage({
          title: "MISSING SELFIE PHOTO",
          details: "Upload the selfie!",
        });
        setIsErrorPresent(true);
      }
    } else {
      setErrorMessage({});
      setIsErrorPresent(false);
      setIsSaving(true);
      const userJson = JSON.stringify(formData);
      console.log(`Saving ${logObject(userJson)}`);

      const formToSend = new FormData();
      formToSend.append("idDocument", idPhoto);
      formToSend.append("selfiePhoto", selfiePhoto);
      formToSend.append("appUserJson", userJson);

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
          setUserToEdit({});
          saveSelfie(res.data.id);
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

  const saveSelfie = (selfieId) => {
    const imageRef = ref(storage, `images/selfie_${selfieId}.jpg`);
    uploadBytes(imageRef, selfiePhoto).then((res) => {
      console.log("Image uploaded!");
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    if (idPhoto === null || selfiePhoto === null) {
      if (idPhoto == null) {
        setErrorMessage({
          title: "MISSING ID DOCUMENT",
          details: "Upload the ID document!",
        });
        setIsErrorPresent(true);
      } else {
        setErrorMessage({
          title: "MISSING SELFIE PHOTO",
          details: "Upload the selfie!",
        });
        setIsErrorPresent(true);
      }
    } else {
      setErrorMessage({});
      setIsErrorPresent(false);
      setIsSaving(true);
      const userJson = JSON.stringify(userToEdit);
      console.log(`Saving ${logObject(userJson)}`);

      const formToSend = new FormData();
      formToSend.append("idDocument", idPhoto);
      formToSend.append("selfiePhoto", selfiePhoto);
      formToSend.append("appUserJson", userJson);

      axios
        .put(
          `http://localhost:8080/api/v1/users/${userToEdit.id}`,
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
      .get("http://localhost:8080/api/v1/users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [formData, isSaving, userWasDeleted]);

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
    console.log(user);
    setIsEditFormActive(true);
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

  const handleDeleteUser = (event) => {
    const userToDeleteId = event.target.id;
    console.log(`Deleting user with id: ${userToDeleteId}`);

    axios
      .delete(`http://localhost:8080/api/v1/users/${userToDeleteId}`)
      .then((res) => {
        deleteImageFromFirebaseStorage(userToDeleteId);
        setUserWasDeleted(-1 * userWasDeleted);
      })
      .catch((err) => {
        if (err.response != null) {
          const errorMessage = err.response.data.message;
          console.error(err);
          alert(errorMessage);
        }
      });
  };

  const deleteImageFromFirebaseStorage = (id) => {
    const deleteImageRef = ref(storage, `images/selfie_${id}.jpg`);
    deleteObject(deleteImageRef)
      .then(() =>
        console.log(`Selfie with ID ${id} deleted from Firebase Storage!`)
      )
      .catch((err) => console.error(err));
  };

  const formatAddress = (address) => {
    return `${address.country}, ${address.city}, ${address.street} ${address.number}`;
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
              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={displayForm}
              >
                Add user
              </button>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col items-end px-5 relative">
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                  Currently logged in as
                </p>
                <div
                  className="hover:underline hover:text-blue-500 cursor-pointer"
                  onClick={handleDropdownClick}
                >
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">
                    {loginEmail}
                  </h1>
                </div>
              </div>
              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {isEditFormActive && (
            <UserEditFormModal
              title={"Edit existing data"}
              closeModal={closeEditModal}
              handleFormChange={handleEditFormChange}
              handleFormSubmit={handleEditFormSubmit}
              handleIdPhotoChange={handleIdPhotoChange}
              handleSelfiePhotoChange={handleSelfiePhotoChange}
              isSaving={isSaving}
              isErrorPresent={isErrorPresent}
              errorMessage={errorMessage}
              editUserInfo={userToEdit}
              idPhoto={idPhoto}
              selfiePhoto={selfiePhoto}
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
            />
          )}

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <TableHead />
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
                    userImageUrl={staticImageUrl}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    birthDate={user.birthDate}
                    placeOfBirth={formatAddress(user.placeOfBirth)}
                    countryOfCitizenship={user.countryOfCitizenship}
                    gender={user.gender}
                    phoneNumber={user.phoneNumber}
                    passportNumber={user.passportNumber}
                    passportDateOfExpiry={user.passportDateOfExpiry}
                    passportDateOfIssue={user.passportDateOfIssue}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                    getImageUrlForId={getImageUrlForId}
                  />
                ))}
            </tbody>
          </table>
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
