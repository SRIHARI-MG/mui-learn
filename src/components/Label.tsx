import React from "react";

interface LabelProps{
  htmlFor: string;
  children?: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, required }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-medium text-xl text-gray-700"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
