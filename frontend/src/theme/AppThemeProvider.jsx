import { useMemo } from "react";

import {
    ThemeProvider,
    createTheme,
    CssBaseline,
} from "@mui/material";

import { colorThemes } from "./theme";
import { useThemeSettings } from "./ThemeContext";

export default function AppThemeProvider({
    children,
}) {
    const { mode, accent } =
        useThemeSettings();

    const theme = useMemo(() => {
        const current =
            colorThemes[accent];

        return createTheme({
            palette: {
                mode,

                primary: {
                    main: current.primary,
                },

                secondary: {
                    main: current.secondary,
                },
            },

            shape: {
                borderRadius: 12,
            },

            components: {
                MuiButton: {
                    defaultProps: {
                        disableElevation: true,
                    },
                },
            },
        });
    }, [mode, accent]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}