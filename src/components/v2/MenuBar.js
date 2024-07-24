import React, { useEffect, useState } from "react";
import ModeNav from "../icons/ModeNav";
import GearIcon from "../icons/GearIcon";
import LogoutIconV2 from "../icons/LogoutIconV2";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MenuBar = ({
  colorModeColors,
  setColorModeColors,
  lightMode,
  darkMode,
  currentTheme,
  setCurrentTheme,
  user,
  setUser,
  API_URL,
  userWasModified,
  setUserWasModified,
}) => {
  const navigate = useNavigate();
  const DEFAULT_ICON_COLOR = "#9a9a9a";
  const ACTIVE_ICON_COLOR = "#e1b77a";
  const DEFAULT_BACKGROUND_COLOR = "transparent";
  const ACTIVE_BACKGROUND_COLOR = "#554130";
  const navIds = ["homeNav", "studentListNav", "reportNav"];
  const ICON_SIZE_PERCENT = 0.8;
  const ICON_SIZES = ICON_SIZE_PERCENT * 315;

  const [svgColors, setSvgColors] = useState({
    burger: DEFAULT_ICON_COLOR,
    homeNav: ACTIVE_ICON_COLOR,
    studentListNav: DEFAULT_ICON_COLOR,
    reportNav: DEFAULT_ICON_COLOR,
    modeNav: DEFAULT_ICON_COLOR,
    userNav: DEFAULT_ICON_COLOR,
  });

  const [navBackColors, setNavBackColors] = useState({
    homeNav: ACTIVE_BACKGROUND_COLOR,
    studentListNav: DEFAULT_BACKGROUND_COLOR,
    reportNav: DEFAULT_BACKGROUND_COLOR,
  });

  useEffect(() => {
    const savedColors = localStorage.getItem("colors");
    const savedBackColors = localStorage.getItem("backColors");
    if (savedColors) {
      setSvgColors(JSON.parse(savedColors));
    }
    if (navBackColors) {
      setNavBackColors(JSON.parse(savedBackColors));
    }
  }, []);

  const handleNavClick = (event) => {
    const navElement = event.currentTarget;
    const nav = navElement.parentElement.id;
    localStorage.setItem("activeNav", nav);
    if (nav !== "modeNav" && nav !== "burger" && nav !== "userNav") {
      const colors = {
        ...svgColors,
        burger: DEFAULT_ICON_COLOR,
        homeNav: DEFAULT_ICON_COLOR,
        studentListNav: DEFAULT_ICON_COLOR,
        reportNav: DEFAULT_ICON_COLOR,
        modeNav: DEFAULT_ICON_COLOR,
        userNav: DEFAULT_ICON_COLOR,
        [nav]: ACTIVE_ICON_COLOR,
      };
      const backColors = {
        ...navBackColors,
        homeNav: DEFAULT_BACKGROUND_COLOR,
        studentListNav: DEFAULT_BACKGROUND_COLOR,
        reportNav: DEFAULT_BACKGROUND_COLOR,
        [nav]: ACTIVE_BACKGROUND_COLOR,
      };
      setNavBackColors(backColors);
      setSvgColors(colors);
      localStorage.setItem("backColors", JSON.stringify(backColors));
      localStorage.setItem("colors", JSON.stringify(colors));
    }

    if (nav === "modeNav") {
      const newColorModeColors =
        currentTheme === "light" ? darkMode : lightMode;
      setCurrentTheme(currentTheme === "light" ? "dark" : "light");
      setColorModeColors(newColorModeColors);
      const invertedTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", invertedTheme);
    }
  };

  const handleLogout = () => {
    axios
      .post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("user");
          setUserWasModified(-1 * userWasModified);
          toast.success("Logout successful!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    const colors = {
      burger: DEFAULT_ICON_COLOR,
      homeNav: ACTIVE_ICON_COLOR,
      studentListNav: DEFAULT_ICON_COLOR,
      reportNav: DEFAULT_ICON_COLOR,
      modeNav: DEFAULT_ICON_COLOR,
      userNav: DEFAULT_ICON_COLOR,
    };
    const backColors = {
      homeNav: ACTIVE_BACKGROUND_COLOR,
      studentListNav: DEFAULT_BACKGROUND_COLOR,
      reportNav: DEFAULT_BACKGROUND_COLOR,
    };
    setNavBackColors(backColors);
    setSvgColors(colors);
    localStorage.setItem("backColors", JSON.stringify(backColors));
    localStorage.setItem("colors", JSON.stringify(colors));
  };

  const [settingsAreOpen, setSettingsAreOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      id="menubar"
      class="flex flex-col bg-[#141414] items-center justify-between h-full w-1/4 z-50"
      data-isopen={isMenuOpen}
    >
      <Toaster />
      <Tooltip id="navTooltip" />
      <div
        id="burger"
        class="flex justify-start pl-5 items-center h-10 w-full mt-8"
      >
        <a
          class="inner hover:cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-tooltip-id="navTooltip"
          data-tooltip="Menu"
          data-tooltip-place="right"
        >
          <svg
            viewBox="0 0 24 24"
            style={{ height: ICON_SIZES / 70 + "vh", minHeight: "35px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M5 12H18"
                stroke={svgColors.burger}
                strokeWidth="1.6"
                stroke-linecap="round"
              ></path>
              <path
                d="M5 17H11"
                stroke={svgColors.burger}
                strokeWidth="1.6"
                stroke-linecap="round"
              ></path>
              <path
                d="M5 7H15"
                stroke={svgColors.burger}
                strokeWidth="1.6"
                stroke-linecap="round"
              ></path>
            </g>
          </svg>
        </a>
      </div>
      <nav
        id="navs"
        class="flex flex-col w-full h-[30vh] justify-between mb-36"
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <a
            id="homeNav"
            class="flex justify-start items-center h-10 w-full gap-5 pl-3"
            data-tooltip-id="navTooltip"
            data-tooltip-content="Home"
            data-tooltip-place="right"
          >
            <div
              class="inner p-3 rounded-md hover:cursor-pointer"
              style={{ backgroundColor: navBackColors.homeNav }}
              onClick={handleNavClick}
            >
              <svg
                style={{ height: ICON_SIZES / 80 + "vh", minHeight: "25px" }}
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
                    stroke={svgColors.homeNav}
                    strokeWidth="1.6"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
            <div
              className="font-semibold select-none"
              style={{ color: svgColors.homeNav }}
              onClick={handleNavClick}
            >
              Home
            </div>
          </a>
        </Link>
        {user && (
          <Link to="/data" style={{ textDecoration: "none" }}>
            <a
              id="studentListNav"
              class="flex justify-start items-center h-10 w-full gap-5 pl-3"
              data-tooltip-id="navTooltip"
              data-tooltip-content="Data"
              data-tooltip-place="right"
            >
              <div
                class="inner p-3 rounded-md hover:cursor-pointer"
                style={{ backgroundColor: navBackColors.studentListNav }}
                onClick={handleNavClick}
              >
                <svg
                  viewBox="0 0 1024 1024"
                  style={{ height: ICON_SIZES / 90 + "vh", minHeight: "23px" }}
                  class="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M978.578286 900.461714l-108.617143-108.617143c30.134857-39.570286 48.274286-88.795429 48.274286-142.189714a235.739429 235.739429 0 0 0-235.52-235.373714 235.739429 235.739429 0 0 0-235.373715 235.373714 235.739429 235.739429 0 0 0 235.446857 235.52c53.467429 0 102.692571-18.139429 142.189715-48.274286l108.617143 108.544a31.524571 31.524571 0 0 0 44.836571 0 31.744 31.744 0 0 0 0.146286-44.982857zM510.902857 649.654857a172.105143 172.105143 0 0 1 171.885714-171.885714 171.885714 171.885714 0 0 1 0 343.771428 172.178286 172.178286 0 0 1-171.885714-171.885714z m270.262857-378.514286c0 17.554286-14.262857 31.744-31.817143 31.744H431.396571a31.744 31.744 0 0 1 0-63.488h317.952c17.554286 0 31.817143 14.189714 31.817143 31.744z m-609.426285 620.032h211.968a31.890286 31.890286 0 0 1 0 63.634286H171.739429c-58.368 0-106.057143-47.542857-106.057143-106.057143V283.062857c0-14.262857 5.12-28.086857 14.262857-39.058286L240.420571 53.101714a57.417143 57.417143 0 0 1 43.885715-20.48h517.997714c58.441143 0 106.057143 47.542857 106.057143 106.057143V366.445714a31.744 31.744 0 0 1-63.634286 0V138.605714a42.422857 42.422857 0 0 0-42.276571-42.349714H336.018286V280.137143a50.688 50.688 0 0 1-50.980572 50.176H129.389714v518.509714c0 23.332571 19.017143 42.349714 42.349715 42.349714zM272.457143 113.810286l-128.512 152.868571h128.512v-152.868571z m79.506286 476.16a31.744 31.744 0 0 0 0-63.634286H240.64a31.744 31.744 0 0 0 0 63.634286h111.323429z m0 146.066285a31.744 31.744 0 0 0 0-63.561142H240.64a31.744 31.744 0 0 0 0 63.561142h111.323429z m31.744-353.206857H240.64a31.744 31.744 0 0 0 0 63.561143h143.067429a31.744 31.744 0 0 0 0-63.561143z"
                      fill={svgColors.studentListNav}
                    ></path>
                  </g>
                </svg>
              </div>
              <div
                className="font-semibold select-none"
                style={{ color: svgColors.studentListNav }}
                onClick={handleNavClick}
              >
                Students
              </div>
            </a>
          </Link>
        )}
        {user && (
          <Link to="/report" style={{ textDecoration: "none" }}>
            <a
              id="reportNav"
              class="flex justify-start items-center h-10 w-full gap-5 pl-3"
              data-tooltip-id="navTooltip"
              data-tooltip-content="Report"
              data-tooltip-place="right"
            >
              <div
                class="inner p-3 rounded-md hover:cursor-pointer"
                style={{ backgroundColor: navBackColors.reportNav }}
                onClick={handleNavClick}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ height: ICON_SIZES / 75 + "vh", minHeight: "25px" }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7"
                      stroke={svgColors.reportNav}
                      strokeWidth="1.6"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div
                className="font-semibold select-none"
                style={{ color: svgColors.reportNav }}
                onClick={handleNavClick}
              >
                Report
              </div>
            </a>
          </Link>
        )}
      </nav>
      <a
        class="flex-col inner p-3 rounded-md hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setSettingsAreOpen(!settingsAreOpen);
        }}
      >
        <div
          className="flex-col pb-5"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {settingsAreOpen && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <ModeNav
                handleNavClick={handleNavClick}
                svgColors={svgColors}
                currentTheme={currentTheme}
                ICON_SIZES={ICON_SIZES}
              />
              {user ? (
                <LogoutIconV2
                  color={svgColors.userNav}
                  ICON_SIZES={ICON_SIZES}
                  handleLogout={handleLogout}
                />
              ) : (
                <></>
              )}
            </div>
          )}
          <GearIcon color={svgColors.userNav} ICON_SIZES={ICON_SIZES} />
        </div>
      </a>
    </div>
  );
};

export default MenuBar;
