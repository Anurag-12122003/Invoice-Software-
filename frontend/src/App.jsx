import { Stack } from "@mui/material";
import { Login } from "./pages/Login";
import { ThemeToggle } from "./components/ThemeToggle";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Header } from "./components/header/Header";
import { Company } from "./pages/Company";

export default function App () {
  return (
    <Stack sx={{
      // border: "1px solid red",
      height: "100vh"
    }}>
      <ThemeToggle />
      <Header />
      <Company />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Stack>
  );
};