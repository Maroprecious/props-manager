import { createContext } from "react";

const AppThemeContext = createContext<"light" | "dark">("light");

export default AppThemeContext;