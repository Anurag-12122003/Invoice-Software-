import { InputAdornment, TextField } from "@mui/material";

export const InputField = ({ ...fieldProps }) => {
  return (
    <TextField
      variant="standard"
      placeholder={fieldProps.placeholder}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="start">
              {fieldProps.icon1}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
