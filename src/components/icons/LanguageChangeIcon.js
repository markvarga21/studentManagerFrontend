import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const LanguageChangeIcon = ({color}) => {
    const DEFAULT_LANGUAGE = "en";
    const [language, setLanguage] = useState(localStorage.getItem("language") || DEFAULT_LANGUAGE);
    const [t, i18n] = useTranslation("global");

    const switchLanguage = () => {
        if (localStorage.getItem("language") === "en") {
            localStorage.setItem("language", "hu");
            setLanguage("hu");
            i18n.changeLanguage("hu");
        } else {
            localStorage.setItem("language", "en");
            setLanguage("en");
            i18n.changeLanguage("en");
        }
    }

    return (
        <span
            className={"text-base text-center font-semibold"}
            style={{color: color}}
            onClick={switchLanguage}
        >
            {language === "en" ? "HU" : "EN"}
        </span>
    );
};

export default LanguageChangeIcon;
