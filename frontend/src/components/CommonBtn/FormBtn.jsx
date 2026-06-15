import { Button } from "@mui/material";

export const FormBtn = ({ btnText, type }) => {
  return (
    <Button
      type={type}
      variant="outlined"
      sx={{
        bgcolor: "primary.main",
        color: "textColor.main",
        fontSize: "20px",
        "&:hover": {
          bgcolor: "#000080",
          color: "white",
          transition: "all 0.3s ease",
        },
      }}
    >
      {btnText}
    </Button>
  );
};
