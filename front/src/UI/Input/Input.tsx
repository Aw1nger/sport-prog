import React from "react";
import "./input.scss";

export const Input = ({
  value,
  setValue,
  ...props
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>> | Function;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      {...props}
      className={`input ${props.className}`}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
