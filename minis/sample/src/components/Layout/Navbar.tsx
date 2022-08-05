import "./Navbar.css";

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const pathToName: Record<string, string> = {
  "": "Home",
  ads: "Ads",
  auth: "Authentication",
  bitmoji: "Bitmoji",
  leaderboards: "Leaderboards",
  localstorage: "Local Storage",
  permissions: "Permissions",
  realtime: "Realtime",
  sharing: "Sharing",
  shortcut: "Shortcut (Android)",
  social: "Social",
  storage: "Storage",
  tokens: "Tokens",
  updates: "Updates",
};

export const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  const location = useLocation();
  const title = pathToName[location.pathname.slice(1)];

  return (
    <div className="nav-bg">
      <nav className="nav">
        <button
          className="nav-title textstyle-title"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          {title}
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isNavExpanded ? "nav-rotate-180" : ""}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.439339 0.939343C1.02513 0.353556 1.97487 0.353555 2.56066 0.939341L10 8.37868L17.4393 0.93934C18.0251 0.353553 18.9749 0.353553 19.5607 0.93934C20.1464 1.52513 20.1464 2.47487 19.5607 3.06066L11.0607 11.5607C10.4749 12.1464 9.52513 12.1464 8.93934 11.5607L0.43934 3.06066C-0.146446 2.47488 -0.146447 1.52513 0.439339 0.939343Z"
              fill="#16191C"
            />
          </svg>
        </button>
        <div className={isNavExpanded ? "nav-menu expanded" : "nav-menu"}>
          <div className="nav-link-container">
            {[
              "",
              "ads",
              "auth",
              "bitmoji",
              "leaderboards",
              "localstorage",
              "permissions",
              "realtime",
              "sharing",
              "shortcut",
              "social",
              "storage",
              "tokens",
              "updates",
            ].map((path) => {
              return (
                <NavLink
                  key={path}
                  to={`/${path}`}
                  className="nav-link textstyle-body"
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  {pathToName[path]}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};
