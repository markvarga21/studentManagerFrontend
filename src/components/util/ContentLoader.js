import React from "react";

const ContentLoader = ({ label, colors }) => {
    return <div className="flex flex-col w-full">
        <div
            className="font-inter font-semibold 2xl:text-lg xl:text-sm"
            style={{color: colors.inputText}}
        >
            {label}
        </div>
        <div>Loading</div>
    </div>
}

export default ContentLoader;