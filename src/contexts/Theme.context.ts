import { createContext } from "react";

const AppThemeContext = createContext<"light" | "dark">("dark");

export default AppThemeContext;