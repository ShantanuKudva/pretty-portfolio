import { useState, useEffect, useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";

export default function useDarkSide() {
  const { globalTheme } = useContext(ThemeContext);
  const systemTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [theme, setTheme] = useState(localStorage.theme || systemTheme);
  useEffect(() => {
    console.log(globalTheme);
  }, [globalTheme]);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(globalTheme);

    if (globalTheme !== systemTheme) {
      localStorage.theme = globalTheme;
    } else {
      localStorage.removeItem("theme");
    }
  }, [globalTheme, colorTheme, systemTheme]);

  return { theme, colorTheme, setTheme };
}
