import React from "react";
import "./themeSwitcher.style.css";
import { ThemeContext } from "../Context/ThemeContext";

export class ThemeSwitcher extends React.Component {
  static contextType = ThemeContext;

  render = () => {
    const { theme, toggleTheme } = this.context;
    return (
      <div className="theme-switcher">
        <label>
          <input
            type="checkbox"
            checked={this.context.theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider round" />
        </label>
        <span className="switch-text">
          {this.context.theme === "light" ? "Day" : "Night"}
        </span>
      </div>
    );
  };
}
