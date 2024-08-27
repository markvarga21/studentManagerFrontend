import axios from "axios";
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import ConfirmationModal from "../modals/ConfirmationModal";

const DeleteIcon = ({
                        allColors,
                        color,
                        studentId,
                        API_URL,
                        deleted,
                        setDeleted,
                        user,
                        basic,
                    }) => {
    const [t, i18n] = useTranslation("global");
    const handleDeleteClick = () => {
        axios
            .delete(`${API_URL}/students/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                    }`,
                },
            })
            .then((res) => {
                setConfirmIsOpen(false);
                setDeleted(-1 * deleted);
                toast.success(t("toast.success.student.delete"));
            })
            .catch((err) => console.error(err));
    };
    const [confirmIsOpen, setConfirmIsOpen] = useState(false);
    return (
        <div>
            {confirmIsOpen &&
                <ConfirmationModal
                        colors={allColors}
                        confirmClick={!basic ? handleDeleteClick : null}
                        closeClick={() => setConfirmIsOpen(false)}
                />}
            <div
                className="hover:cursor-pointer h-full"
                onClick={() => setConfirmIsOpen(true)}
                data-testid={"delete-icon"}
            >
                <Toaster/>
                <svg
                    style={{height: "2.5vh", minHeight: "18px"}}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M10 12V17"
                            stroke={!basic ? color : "#EF4444"}
                            stroke-width="1,5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        {" "}
                        <path
                            d="M14 12V17"
                            stroke={!basic ? color : "#EF4444"}
                            stroke-width="1,5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        {" "}
                        <path
                            d="M4 7H20"
                            stroke={!basic ? color : "#EF4444"}
                            stroke-width="1,5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        {" "}
                        <path
                            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                            stroke={!basic ? color : "#EF4444"}
                            stroke-width="1,5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        {" "}
                        <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke={!basic ? color : "#EF4444"}
                            stroke-width="1,5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        {" "}
                    </g>
                </svg>
            </div>
        </div>

    );
};

export default DeleteIcon;
