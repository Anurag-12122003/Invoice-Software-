import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

const ThemeContext = createContext();

export function ThemeProviderContext({
    children,
}) {
    const [mode, setMode] = useState(
        () => localStorage.getItem("mode") || "light"
    );

    const [accent, setAccent] = useState(
        () => localStorage.getItem("accent") || "blue"
    );

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem("accent", accent);
    }, [accent]);

    const toggleMode = () => {
        setMode((prev) =>
            prev === "light" ? "dark" : "light"
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                mode,
                accent,
                setAccent,
                toggleMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeSettings = () =>
    useContext(ThemeContext);