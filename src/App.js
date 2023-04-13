import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Active } from "./components/Active/Active";
import { Archive } from "./components/Archive/Archive";
import { Done } from "./components/Done/Done";
import { ThemeContext } from "./components/Context/ThemeContext";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }

  componentDidUpdate(prevState) {
    if (prevState === this.state) return;
    document.body.dataset.theme = this.state.theme;
  }

  componentDidMount() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme !== null) {
      this.setState({
        theme: currentTheme,
      });
    } else {
      this.setState({
        ...this.state,
      });
    }
  }

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light",
    });
    const currentThemeLS = this.state.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentThemeLS);
  };

  render = () => {
    return (
      <div className="App">
        <ThemeContext.Provider
          value={{
            theme: this.state.theme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/archive" element={<Archive />} />
              <Route path="/done" element={<Done />} />
              <Route index element={<Active />} />
            </Route>
          </Routes>
        </ThemeContext.Provider>
      </div>
    );
  };
}
