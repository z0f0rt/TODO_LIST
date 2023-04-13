import { Component } from "react";
import deleteLogo from "../../icons/m.png";
import archiveLogo from "../../icons/archive.png";
import activeLogo from "../../icons/activeLogo.png";
import "../ListTodosActive/listTodosActive.style.css";

export class ListTodosDone extends Component {
  constructor(props) {
    super(props);
    const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
    this.localTodosDone = localTodosDone;
    this.state = {
      doneTodos: [],
    };
  }

  getUpdateState = (e) => {
    const done = JSON.parse(localStorage.getItem("localDone"));
    let index = e.currentTarget.id;
    done.splice(index, 1);
    localStorage.setItem("localDone", JSON.stringify(done));
    window.location.reload();
  };

  componentDidUpdate() {
    const done = JSON.parse(localStorage.getItem("localDone"));
    localStorage.setItem("localDone", JSON.stringify(done));
  }

  postInActiveList = (e) => {
    const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
    if (localTodosDone.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosDone.splice(index, 1);
      localStorage.setItem("localDone", JSON.stringify(localTodosDone));
      const localTodosState = JSON.parse(localStorage.getItem("localActive"));
      if (localTodosState !== null) {
        const newlocalTodosState = [...localTodosState, { ...res[0] }];
        localStorage.setItem("localActive", JSON.stringify(newlocalTodosState));
        window.location.reload();
      } else {
        const newlocalTodosState = [{ ...res[0] }];
        localStorage.setItem("localActive", JSON.stringify(newlocalTodosState));
        window.location.reload();
      }
    }
  };

  putTodoInArch = (e) => {
    const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
    if (localTodosDone.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosDone.splice(index, 1);
      localStorage.setItem("localDone", JSON.stringify(localTodosDone));
      const localTodosArchive = JSON.parse(localStorage.getItem("localArch"));
      if (localTodosArchive !== null) {
        const newlocalTodosState = [...localTodosArchive, { ...res[0] }];
        localStorage.setItem("localArch", JSON.stringify(newlocalTodosState));
        window.location.reload();
      } else {
        const newlocalTodosState = [{ ...res[0] }];
        localStorage.setItem("localArch", JSON.stringify(newlocalTodosState));
        window.location.reload();
      }
    }
  };

  render = () => {
    return (
      <div>
        {this.props.localTodosDone &&
          this.props.localTodosDone.map((item, i) => {
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
                    id={i}
                    onClick={this.getUpdateState}
                    src={deleteLogo}
                    alt="Something went wrong"
                    title="Delete"
                    className="style-icons"
                  ></img>
                  <button
                    className="btn-active"
                    id={i}
                    onClick={this.postInActiveList}
                  >
                    Active
                    <img className="style-icons-act" src={activeLogo} alt="" />
                  </button>

                  <img
                    onClick={this.putTodoInArch}
                    src={archiveLogo}
                    alt="Something went wrong"
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
