import React, { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="user-btn btn btn-link px-1 py-0 m-1"
    >
      {theme === "dark" ? (
        <i className="bi bi-sun "></i>
      ) : (
        <i className="bi bi-moon"></i>
      )}
    </button>
  );
};

export default ThemeToggler;
