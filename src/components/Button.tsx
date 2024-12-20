import * as React from "react";
import {
  Button as BaseButton,
  ButtonOwnerState,
  ButtonProps,
} from "@mui/base/Button";
import { CircularProgress } from "@mui/material";

const buttonVariants = {
  primary: `
      bg-blue-900
      text-white
      hover:bg-blue-800
      active:bg-blue-900
    `,
  secondary: `
      bg-gray-200
      text-gray-900
      hover:bg-gray-300
      active:bg-gray-400
      disabled:bg-gray-100
    `,
  outline: `
      bg-transparent
      border
      border-gray-300
      text-gray-700
      hover:bg-gray-50
      active:bg-gray-100
      disabled:bg-transparent
    `,
};

interface ExtendedButtonProps extends ButtonProps {
  variant?: keyof typeof buttonVariants;
  isLoading?: boolean;
}

export const Button = React.forwardRef(function Button(
  props: ExtendedButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { variant = "primary", className, ...otherProps } = props;

  const baseButtonStyles = `
      px-4
      py-2
      rounded-lg
      font-medium
      transition-all
      duration-200
      ease-in-out
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-blue-500
      focus-visible:ring-opacity-50
      disabled:cursor-not-allowed
    `;

  return (
    <BaseButton
      {...otherProps}
      ref={ref}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `${baseButtonStyles} ${buttonVariants[variant]} ${
            className || ""
          } ${state.disabled ? "opacity-50" : ""}`,
        }),
      }}
    >
      {props.isLoading ? <CircularProgress size={20} /> : props.children}
    </BaseButton>
  );
});

export default Button;
