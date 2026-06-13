import {
  Box,
  Stack,
  Switch,
  Typography,
  IconButton,
} from "@mui/material";

import { useThemeSettings } from "./ThemeContext";

const colors = [
  "blue",
  "green",
  "purple",
  "orange",
];

const colorMap = {
  blue: "#1976d2",
  green: "#2e7d32",
  purple: "#7b1fa2",
  orange: "#ed6c02",
};

export default function ThemeSwitcher() {
  const {
    mode,
    accent,
    setAccent,
    toggleMode,
  } = useThemeSettings();

  return (
    <Box p={2}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Typography>
          {mode === "dark"
            ? "Dark"
            : "Light"}
        </Typography>

        <Switch
          checked={mode === "dark"}
          onChange={toggleMode}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        mt={2}
      >
        {colors.map((color) => (
          <IconButton
            key={color}
            onClick={() =>
              setAccent(color)
            }
            sx={{
              width: 35,
              height: 35,
              bgcolor: colorMap[color],
              border:
                accent === color
                  ? "3px solid white"
                  : "none",

              "&:hover": {
                bgcolor:
                  colorMap[color],
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}