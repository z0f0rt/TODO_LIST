import { Component } from "react";
import { ListTodosDone } from "../ListTodosDone/ListTodosDone";
import "./done.style.css";

export class Done extends Component {
  constructor(props) {
    super(props);
    const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
    this.localTodosDone = localTodosDone;
  }

  editValueInput = (e) => {
    const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
    if (localTodosDone.length > 0) {
      localTodosDone.forEach((el) => {
        if (e.currentTarget.id === el.idTitle) {
          el.title = e.target.innerText;
          localStorage.setItem("localDone", JSON.stringify(localTodosDone));
        }
        if (e.currentTarget.id === el.idDesc) {
          el.description = e.target.innerText;
          localStorage.setItem("localDone", JSON.stringify(localTodosDone));
        }
      });
    }
  };

  render = () => {
    return (
      <div>
        {this.localTodosDone && this.localTodosDone.length > 0 ? (
          <ListTodosDone
            editValueInput={this.editValueInput}
            localTodosDone={this.localTodosDone}
          />
        ) : (
          <div className="style-message">
            Done List empty...
          </div>
        )}
      </div>
    );
  };
}
