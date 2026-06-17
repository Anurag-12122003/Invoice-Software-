import { createTheme } from "@mui/material/styles";
import { components } from "./components";
import { lightPalette } from "./mode/light";
import { darkPalette } from "./mode/dark";

export const getTheme = (mode) => {
  return createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    components,
  });
};
