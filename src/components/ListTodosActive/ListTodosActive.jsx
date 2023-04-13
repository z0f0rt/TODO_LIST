import React from "react";
import deleteLogo from "../../icons/m.png";
import archiveLogo from "../../icons/archive.png";
import doneLogo from "../../icons/done.png";
import "./listTodosActive.style.css";

export class ListTodosActive extends React.Component {
  render = () => {
    return (
      <div className="active-todo-list">
        {this.props.activeTodos.map((item, i) => {
          return (
            <div key={i} className="mini-box-todo">
              <div className="text-content-container">
                <div
                  contentEditable="true"
                  data-text="..."
                  suppressContentEditableWarning={true}
                  className="style-input"
                  name="title"
                  id={item.idTitle}
                  onBlur={this.props.editValueInput}
                >
                  {item.title}
                </div>
                <br />
                <div
                  contentEditable="true"
                  data-text="..."
                  suppressContentEditableWarning={true}
                  className="style-input"
                  name="descrips"
                  id={item.idDesc}
                  onBlur={this.props.editValueInput}
                >
                  {item.description}
                </div>
              </div>
              <br />
              <div className="box-icons">
                <img
                  onClick={this.props.btnDeleteTodo.bind(this, i)}
                  src={deleteLogo}
                  alt="Something went wrong"
                  title="Delete"
                  className="style-icons"
                ></img>
                <img
                  onClick={this.props.setForDone.bind(this, i)}
                  src={doneLogo}
                  alt="Something went wrong :("
                  className="style-icons-done"
                  title="In Done"
                ></img>
                <img
                  onClick={this.props.setForArchive.bind(this, i)}
                  src={archiveLogo}
                  alt="Something went wrong :("
                  className="style-icons-arch"
                  title="In Archive"
                ></img>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
}
