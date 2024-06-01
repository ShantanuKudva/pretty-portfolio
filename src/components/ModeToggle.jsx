"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
