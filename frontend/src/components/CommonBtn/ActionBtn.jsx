import { Button } from "@mui/material";

export const ActionBtn = ({ label }) => {
  return <Button sx={{ textTransform: "capitalize" }}>{label}</Button>;
};
