import { Stack } from "@mui/material";
import { Login } from "./pages/Login";
import { ThemeToggle } from "./components/ThemeToggle";
import { Route, Routes } from "react-router-dom";

export default function App () {
  return (
    <Stack sx={{
      // border: "1px solid red",
      height: "100vh"
    }}>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Stack>
  );
};