import * as React from "react";
import {
  InputBase,
  InputBaseProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const baseInputStyles = `
  w-full
  px-3 
  py-2
  text-gray-900
  bg-white
  border
  border-gray-300
  rounded-lg
  shadow-sm
  outline-none
  transition-all
  duration-200
  ease-in-out
  hover:border-gray-400
  focus-visible:border-1
  focus-visible:border-blue-500
  focus-visible:ring-2
  focus-visible:ring-blue-500
  focus-visible:ring-opacity-50
  disabled:bg-gray-100
  disabled:cursor-not-allowed
`;

interface CustomInputProps extends InputBaseProps {
  errorText?: string;
}

export const Input = React.forwardRef(function Input(
  props: CustomInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { className, type, errorText, ...otherProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <InputBase
        {...otherProps}
        inputRef={ref}
        type={type === "password" && showPassword ? "text" : type}
        className={`${baseInputStyles} ${errorText ? "border-red-500" : ""} ${
          className || ""
        }`}
        sx={{
          "&:hover": {
            borderColor: "#cbd5e0 !important",
          },
          "&.Mui-focused": {
            borderColor: "#3182ce !important",
            boxShadow: "0 0 0 4px rgba(49, 130, 206, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#f7fafc",
            borderColor: "#e2e8f0",
          },
        }}
        endAdornment={
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      {errorText && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
    </div>
  );
});

export default Input;
