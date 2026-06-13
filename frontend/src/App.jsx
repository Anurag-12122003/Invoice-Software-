import { Stack } from "@mui/material";
import { Login } from "./pages/Login";

export default function App () {
  return (
    <Stack sx={{
      // border: "1px solid red",
      height: "100vh"
    }}>
      <Login />
    </Stack>
  );
};