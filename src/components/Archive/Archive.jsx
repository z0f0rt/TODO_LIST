import { Component } from "react";
import { ListTodosArchive } from "../ListTodosArchive/listTodosArchive";
import "./archive.style.css";

export class Archive extends Component {
  constructor(props) {
    super(props);
    const localTodosArch = JSON.parse(localStorage.getItem("localArch"));
    this.localTodosArch = localTodosArch;
  }

  editValueInput = (e) => {
    const localTodosArch = JSON.parse(localStorage.getItem("localArch"));
    if (localTodosArch.length > 0) {
      localTodosArch.forEach((el) => {
        if (e.currentTarget.id === el.idTitle) {
          el.title = e.target.innerText;
          localStorage.setItem("localArch", JSON.stringify(localTodosArch));
        }
        if (e.currentTarget.id === el.idDesc) {
          el.description = e.target.innerText;
          localStorage.setItem("localArch", JSON.stringify(localTodosArch));
        }
      });
    }
  };

  render = () => {
    return (
      <div>
        {this.localTodosArch && this.localTodosArch.length > 0 ? (
          <ListTodosArchive
            editValueInput={this.editValueInput}
            localTodosArch={this.localTodosArch}
          />
        ) : (
          <div className="style-message">
           Archive List empty...
          </div>
        )}
      </div>
    );
  };
}
