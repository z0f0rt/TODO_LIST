import React from "react";
import "./header.style.css";
import logo from "../../icons/logo-to-do-list.png";
import { NavLink } from "react-router-dom";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

class Header extends React.Component {
  render = () => {
    return (
      <div>
        <ThemeSwitcher />
        <div className="style-header">
          <img
            style={{
              width: "60px",
              height: "60px",
              paddingTop: "20px",
              paddingRight: "10px",
            }}
            src={logo}
            alt="Somthing went wrong :("
          ></img>
          <div className="header-name">MY TO-DO LIST</div>
        </div>
        <div className="bar">
          <NavLink to="/" className="active-list">
            ACTIVE
          </NavLink>
          <NavLink to="/done" className="done-list">
            {" "}
            DONE
          </NavLink>
          <NavLink to="/archive" className="archive-list">
            ARCHIVE
          </NavLink>
        </div>
      </div>
    );
  };
}

export default Header;
