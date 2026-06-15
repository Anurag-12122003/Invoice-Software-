import { createTheme } from "@mui/material";
import { getPalette } from "./palette";
import { components } from "./components";

export const getTheme = (mode) => {
    return createTheme({
        palette: getPalette(mode),
        components,
    })
};