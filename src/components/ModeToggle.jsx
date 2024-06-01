"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(!checked);
    setTheme(checked ? "dark" : "light");
  };

  React.useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  return (
    <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={30} />
  );
}
