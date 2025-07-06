import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    // system preference if there is no stored theme for the user
    const Darkk = window.matchMedia("(prefers-color-scheme: dark)").matches; // this returns true if the default used theme is dark

    return Darkk ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // setting the new selected theme in the local storage
  }, [theme]); // when i used [theme ], the error of useeffect that it have to be in a react function vanished? why

  const toggleTheme = () => {
    setTheme((prev) => (prev == `light` ? `dark` : `light`));
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* we used curly brackets inside to make it an object, to pass both of them. theme ansd */}
        {children}
      </ThemeContext.Provider>
    </>
  );
};
