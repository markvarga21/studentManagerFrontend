import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import {useTranslation} from "react-i18next";
import React from "react";

const ConfirmationModal = ({colors, closeClick, confirmClick}) => {
    const [t, i18n] = useTranslation("global");
    return <div className="w-full h-full flex justify-center items-center z-20 absolute top-0 left-0 cursor-default"
                style={{
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(80, 80, 80, 0.4)",
                }}>
        <div className={"flex flex-col p-12 xl:w-1/3 2xl:w-1/4 rounded-xl items-center gap-3 cursor-default"}
             style={{backgroundColor: colors.tableHeader}}>
            <div className={"text-center text-2xl font-extrabold"}
                 style={{color: colors.title}}>{t("confirmation.title")}</div>
            <div className={"text-center text-sm"} style={{color: colors.buttonText}}>{t("confirmation.text")}</div>
            <div className={"flex justify-between w-full gap-3 pt-5"}>
                <SecondaryButton buttonTitle={t("confirmation.cancel")} onclick={closeClick} colors={colors}/>
                <PrimaryButton buttonTitle={t("confirmation.confirm")} onclick={confirmClick} />
            </div>
        </div>
    </div>
}

export default ConfirmationModal;