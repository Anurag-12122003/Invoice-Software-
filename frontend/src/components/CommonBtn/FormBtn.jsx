import { Button } from "@mui/material";

export const FormBtn = ({ btnText }) => {
    return <Button variant="outlined" sx={{ fontSize: "20px", "&:hover": {
        bgcolor: "blue",
        color: "white",
        transition: "all 0.3s ease"
    } }}>
        {btnText}
    </Button>
};