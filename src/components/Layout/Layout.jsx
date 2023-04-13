import { Component } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export class Layout extends Component {
  render = () => {
    return (
      <div className="layout">
        <Header />
        <Outlet />
      </div>
    );
  };
}
