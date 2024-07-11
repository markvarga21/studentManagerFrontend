import React, { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import StudentListContent from "./StudentListContent";

const AppV2 = () => {
  const LIGHT_MODE = {
    bg: "white",
    title: "black",
    mainText: "#48494A",
    tableHeader: "#E8E8E8",
    tableBorder: "#D4D7D9",
    tableContent: "#48494A",
    buttonBackGround: "white",
    buttonBorder: "#D4D7D9",
    buttonText: "#48494A",
    icon: "#48494A",
    validBack: "#C8E6C9",
    validText: "#4CAF50",
    validBorder: "none",
    invalidBack: "#FFCDD2",
    invalidText: "#F44336",
    invalidBorder: "none",
    activePageBack: "rgba(255, 183, 122, 0.5)",
    activePageBorder: "none",
    activePageText: "#BB812A",
    inactivePageText: "rgba(72, 73, 74, 0.5)",
  };
  const DARK_MODE = {
    bg: "#121212",
    title: "rgba(255, 255, 255, 0.8)",
    mainText: "white",
    tableHeader: "#1F1F1F",
    tableBorder: "rgba(162, 162, 162, 0.3)",
    tableContent: "rgba(255, 255, 255, 0.5)",
    buttonBackGround: "#1F1F1F",
    buttonBorder: "rgba(162, 162, 162, 0.3)",
    buttonText: "rgba(255, 255, 255, 0.4)",
    icon: "rgba(255, 255, 255, 0.4)",
    validBack: "transparent",
    validText: "rgba(76, 175, 80, 0.7)",
    validBorder: "1px solid rgba(76, 175, 80, 0.7)",
    invalidBack: "transparent",
    invalidText: "rgba(244, 67, 54, 0.7)",
    invalidBorder: "1px solid rgba(244, 67, 54, 0.7)",
    activePageBack: "rgba(255, 183, 122, 0.2)",
    activePageBorder: "2px solid rgba(162, 162, 162, 0.3)",
    activePageText: "rgba(255, 255, 255, 0.5)",
    inactivePageText: "rgba(255, 255, 255, 0.3)",
  };
  const [currentTheme, setCurrentTheme] = useState("light");
  const [colorModeColors, setColorModeColors] = useState(LIGHT_MODE);
  return (
    <div className="flex h-[100vh]">
      <MenuBar
        colorModeColors={colorModeColors}
        setColorModeColors={setColorModeColors}
        lightMode={LIGHT_MODE}
        darkMode={DARK_MODE}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      <StudentListContent
        colorModeColors={colorModeColors}
        currentTheme={currentTheme}
      />
    </div>
  );
};

export default AppV2;
