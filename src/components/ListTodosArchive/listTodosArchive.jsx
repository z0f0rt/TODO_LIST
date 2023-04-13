import { Component } from "react";
import deleteLogo from "../../icons/m.png";
import doneLogo from "../../icons/done.png";
import "../ListTodosActive/listTodosActive.style.css";
import activeLogo from "../../icons/activeLogo.png";

export class ListTodosArchive extends Component {
  constructor(props) {
    super(props);
    const localTodosArch = JSON.parse(localStorage.getItem("localArch"));
    this.localTodosArch = localTodosArch;
    this.state = {
      archiveTodos: [],
    };
  }

  componentDidUpdate() {
    const archieve = JSON.parse(localStorage.getItem("localArch"));
    localStorage.setItem("localArch", JSON.stringify(archieve));
  }

  getUpdateState = (e) => {
    const archieve = JSON.parse(localStorage.getItem("localArch"));
    let index = e.currentTarget.id;
    console.log(archieve[index]);
    archieve.splice(index, 1);
    console.log(archieve);
    localStorage.setItem("localArch", JSON.stringify(archieve));
    window.location.reload();
  };

  postInActiveList = (e) => {
    const localTodosArch = JSON.parse(localStorage.getItem("localArch"));
    if (localTodosArch.length > 0) {
      let index = e.currentTarget.id;
      let res = localTodosArch.splice(index, 1);
      localStorage.setItem("localArch", JSON.stringify(localTodosArch));
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

  putTodoInDone = (e) => {
    const localTodosArch = JSON.parse(localStorage.getItem("localArch"));
    if (localTodosArch.length > 0) {
      let index = e.currentTarget.id;
      let arrayOfOneTask = localTodosArch.splice(index, 1);
      localStorage.setItem("localArch", JSON.stringify(localTodosArch));
      const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
      if (localTodosDone !== null) {
        const newLocalTodosDone = [...localTodosDone, { ...arrayOfOneTask[0] }];
        localStorage.setItem("localDone", JSON.stringify(newLocalTodosDone));
        window.location.reload();
      } else {
        const newLocalTodosDone = [{ ...arrayOfOneTask[0] }];
        localStorage.setItem("localDone", JSON.stringify(newLocalTodosDone));
        window.location.reload();
      }
    }
  };

  render = () => {
    return (
      <div>
        {this.props.localTodosArch &&
          this.props.localTodosArch.map((item, i) => {
            return (
              <div key={i} className="mini-box-todo">
                <div className="text-content-container">
                  <div
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    className="style-input"
                    name="title"
                    id={item.idTitle}
                    onBlur={this.props.editValueInput}
                  >
                    {item.title}
                  </div>
                  <div
                    contentEditable="true"
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
                    alt="Something went wrong :("
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
                    id={i}
                    onClick={this.putTodoInDone}
                    src={doneLogo}
                    alt="Something went wrong :("
                    title="In Done"
                    className="style-icons-done"
                  ></img>
                </div>
              </div>
            );
          })}
      </div>
    );
  };
}
