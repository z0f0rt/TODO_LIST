import React from "react";
import "./todoCreator.style.css";

export class TodoCreator extends React.Component {
  render = () => {
    return (
      <div className="todo-creator-style">
        <div className="container-create-todo">
          <div className="cont-title">
            <div className="text-title"> TITLE:</div>
            <div className="title-box">
              <div
                contentEditable="true"
                suppressContentEditableWarning={true}
                className="style-input"
                name="title"
                id={this.props.state.newTodo.idTitle}
                onBlur={this.props.valUpdate}
              >
                {this.props.state.newTodo.title}
              </div>
              <div className="style-warning-msg" ref={this.props.divRef}></div>
            </div>
          </div>
          <div className="cont-title">
            <div> DESCRIPTION:</div>
            <div
              contentEditable="true"
              suppressContentEditableWarning={true}
              className="input-style-creator"
              name="descrip"
              id={this.props.state.newTodo.idDesc}
              onBlur={this.props.valUpdate}
            >
              {this.props.state.newTodo.description}
            </div>
          </div>
        </div>
        <button
          className="btn-create"
          ref={this.props.buttonRef}
          disabled={false}
          onClick={this.props.btnAddTodo}
        >
          CREATE
        </button>
      </div>
    );
  };
}
