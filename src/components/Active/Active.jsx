import React from "react";
import { ListTodosActive } from "../ListTodosActive/ListTodosActive";
import { TodoCreator } from "../TodoCreator/TodoCreator";
import "./active.style.css";
import { v4 as uuidv4 } from "uuid";

export class Active extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTodos: [],
      archiveTodos: [],
      doneTodos: [],
      newTodo: {
        title: "",
        description: "",
        idTitle: this.id(),
        idDesc: this.id(),
      },
    };

    const todoLocal = JSON.parse(localStorage.getItem("localActive"));
    if (todoLocal !== null) {
      let todoListArr = [...this.state.activeTodos, ...todoLocal];
      const todoSortedForNew = todoListArr.reduce((acc, elem, _, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (elem.idTitle === acc[j]?.idTitle) {
            return acc;
          }
        }
        return [...acc, elem];
      }, []);
      this.state.activeTodos = todoSortedForNew;
    }
    this.btnAddTodo = this.btnAddTodo.bind(this);
    this.btnDeleteTodo = this.btnDeleteTodo.bind(this);
    this.setForArchive = this.setForArchive.bind(this);
    this.setForDone = this.setForDone.bind(this);
    this.buttonRef = React.createRef();
    this.divRef = React.createRef();
  }

  componentDidMount = () => {
    const localTodos = JSON.parse(localStorage.getItem("localActive"));
    if (localTodos !== null) {
      this.setState({
        ...this.state,
        activeTodos: [...localTodos],
      });
    }
  };

  componentDidUpdate = (prevState) => {
    if (prevState === this.state) return;
    localStorage.setItem("localActive", JSON.stringify(this.state.activeTodos));
  };

  id() {
    return uuidv4();
  }

  valUpdate = (e) => {
    const messageDiv = this.divRef.current;
    messageDiv.innerText = "";
    if (e.currentTarget.id === this.state.newTodo.idTitle) {
      const inpTitle = e.target.innerText;
      if (inpTitle.length < 2) {
        const messageDiv = this.divRef.current;
        const nodeBtn = this.buttonRef.current;
        nodeBtn.disabled = true;
        messageDiv.innerText = "Please enter at least 2 letters";
      } else {
        this.buttonRef.current.disabled = false;
        this.divRef.current.innerText = "";
      }
      this.setState({
        ...this.state,
        newTodo: { ...this.state.newTodo, title: inpTitle },
      });
    }
    if (e.currentTarget.id === this.state.newTodo.idDesc) {
      const inpDescrip = e.target.innerText;
      this.setState({
        ...this.state,
        newTodo: { ...this.state.newTodo, description: inpDescrip },
      });
    }
  };

  btnAddTodo = () => {
    if (this.state.newTodo.title === "") {
      const messageDiv = this.divRef.current;
      messageDiv.innerText = "Title must not be empty";
    } else {
      this.setState({
        ...this.state,
        activeTodos: [...this.state.activeTodos, this.state.newTodo],
        newTodo: {
          ...this.state.newTodo,
          description: "",
          title: "",
          idTitle: this.id(),
          idDesc: this.id(),
        },
      });
    }
  };

  btnDeleteTodo = (i) => {
    const deleteTodo = this.state.activeTodos;
    deleteTodo.splice(i, 1);
    this.setState({
      ...this.state,
      activeTodos: [...deleteTodo],
    });
  };

  editValueInput = (e) => {
    this.state.activeTodos.forEach((el, i) => {
      if (e.currentTarget.id === el.idTitle) {
        let copy = el;
        copy.title = e.target.innerText;
        let state = { ...this.state, activeTodos: [...this.state.activeTodos] };
        state.activeTodos[i] = { ...copy };
        this.setState({ state });
      }
      if (e.currentTarget.id === el.idDesc) {
        let copy = el;
        copy.description = e.target.innerText;
        let state = { ...this.state, activeTodos: [...this.state.activeTodos] };
        state.activeTodos[i] = { ...copy };
        this.setState({ state });
      }
    });
  };

  setForArchive = (i) => {
    const newArch = this.state.activeTodos;
    let arrRes = newArch.splice(i, 1);
    this.state.archiveTodos = [...this.state.archiveTodos, { ...arrRes[0] }];
    this.state.activeTodos = [...newArch];
    const localListArch = JSON.parse(localStorage.getItem("localArch"));
    if (localListArch !== null) {
      let copyLocalTodosArch = localListArch;
      let res = [...copyLocalTodosArch, ...this.state.archiveTodos];
      const result = res.reduce((acc, elem, _, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (elem.idTitle === acc[j]?.idTitle) {
            return acc;
          }
        }
        return [...acc, elem];
      }, []);
      console.log(result);
      localStorage.setItem("localArch", JSON.stringify(result));
      this.setState({ ...this.state });
    } else {
      localStorage.setItem(
        "localArch",
        JSON.stringify(this.state.archiveTodos)
      );
      this.setState({ ...this.state });
    }
  };

  setForDone = (i) => {
    const newDoneState = this.state.activeTodos;
    let arrRes = newDoneState.splice(i, 1);
    this.state.doneTodos = [...this.state.doneTodos, { ...arrRes[0] }];
    this.state.activeTodos = [...newDoneState];
    const localTodosDone = JSON.parse(localStorage.getItem("localDone"));
    if (localTodosDone !== null) {
      let copyLocalTodosDone = localTodosDone;
      let arrLocalListDone = [...copyLocalTodosDone, ...this.state.doneTodos];
      const newArrLocalListDone = arrLocalListDone.reduce((acc, el, _, arr) => {
        for (let j = 0; j < arr.length; j++) {
          if (el.idTitle === acc[j]?.idTitle) {
            return acc;
          }
        }
        return [...acc, el];
      }, []);
      localStorage.setItem("localDone", JSON.stringify(newArrLocalListDone));
      this.setState({ ...this.state });
    } else {
      localStorage.setItem("localDone", JSON.stringify(this.state.doneTodos));
      this.setState({ ...this.state });
    }
  };

  render = () => {
    return (
      <div>
        <div className="active-todos">
          <TodoCreator
            state={this.state}
            valUpdate={this.valUpdate}
            divRef={this.divRef}
            buttonRef={this.buttonRef}
            btnAddTodo={this.btnAddTodo}
          />
          {this.state.activeTodos.length > 0 ? (
            <ListTodosActive
              editValueInput={this.editValueInput}
              activeTodos={this.state.activeTodos}
              btnDeleteTodo={this.btnDeleteTodo}
              setForArchive={this.setForArchive}
              setForDone={this.setForDone}
            />
          ) : (
            <div className="style-message">
              Active List empty... Do you want to add todo?
            </div>
          )}
        </div>
      </div>
    );
  };
}
