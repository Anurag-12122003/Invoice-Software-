import { Autocomplete, TextField } from "@mui/material";

export const SearchBox = () => {
    return <Autocomplete renderInput={(params) => (
        <TextField {...params} />
    )} />
};