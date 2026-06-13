import { Typography } from "@mui/material";

export const Heading = ({ variant, text }) => {
    return <Typography variant={variant ? variant : "h5"} sx={{ fontWeight: "bold" }}>
        {text}
    </Typography>
};

export const Para = ({ variant, text }) => {
    return <Typography variant={variant ? variant : "body1"}>
        {text}
    </Typography>
};