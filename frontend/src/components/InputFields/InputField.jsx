import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

export const InputField = ({ values, onChange, onBlur, ...fieldProps }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <TextField
      name={fieldProps.id}
      value={values}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      type={
        fieldProps.type === "password"
          ? isShow
            ? "text"
            : "password"
          : fieldProps.type
      }
      placeholder={fieldProps.placeholder}
      autoComplete="off"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment>{fieldProps.startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment>
              {fieldProps.id === "password" && (
                <IconButton onClick={() => setIsShow((prev) => !prev)}>
                  {isShow ? <FaRegEyeSlash /> : <FaRegEye />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
