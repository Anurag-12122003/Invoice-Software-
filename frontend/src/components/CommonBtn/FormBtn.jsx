import { Button } from "@mui/material";

export const FormBtn = ({ btnText }) => {
  // let theme = useTheme();
  return (
    <Button
      variant="outlined"
      sx={{
        fontSize: "20px",
        bgcolor: "primary.main",
        color: "custom.gray50",
        "&:hover": {
          bgcolor: "primary.dark",
          // color: "text.secondary",
          transition: "all 0.3s ease",
        },
      }}
    >
      {btnText}
    </Button>
  );
};
