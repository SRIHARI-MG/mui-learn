import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Select as CustomSelect,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { padding } from "@mui/system";
import clsx from "clsx";

const baseSelectStyles = `
  w-full
  text-gray-900
  bg-white
  !rounded-lg
  shadow-sm
  outline-none
  transition-all
  duration-200
  ease-in-out
  hover:border-gray-200
  focus-visible:border-blue-200
  focus-visible:ring-1
  focus-visible:ring-blue-200
  focus-visible:ring-opacity-50
  disabled:bg-gray-100
  disabled:cursor-not-allowed
  !important
`;

interface SelectProps {
  options: string[];
  selectedValues: string;
  className?: string;
  onChange?: (selectedValues: string) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  selectedValues,
  className,
  onChange,
  disabled,
}) => {
  const handleChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value as string;
    onChange?.(value);
  };

  return (
    <>
      <CustomSelect
        value={selectedValues}
        onChange={handleChange}
        className={clsx(baseSelectStyles, className)}
        displayEmpty
        disabled={disabled}
        sx={{
          "& .MuiSelect-select": {
            padding: "14px 12px !important",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e0 !important",
            borderWidth: "1px !important",
          },
          "&.Mui-focused": {
            borderColor: "#3182ce !important",
            borderWidth: "0px !important",
            boxShadow: "0 0 0 4px rgba(49, 130, 206, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#f7fafc",
            borderColor: "#e2e8f0",
          },
        }}
      >
        <MenuItem value="">
          <span className="!text-md !text-gray-600">Select</span>
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </CustomSelect>
    </>
  );
};

export default Select;
