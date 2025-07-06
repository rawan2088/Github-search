import { useContext } from "react";
import "./App.css";
import Search from "./Search";

import { ThemeContext } from "./themeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Example icon

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <header>
        <h1>Devfinder</h1>

        <div className="themeBtn">
          <button onClick={toggleTheme}>
            {theme == `light` ? "DARK" : "LIGHT"}
          </button>
          {theme == "light" ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </div>
      </header>
      <Search></Search>
    </>
  );
}

export default App;
