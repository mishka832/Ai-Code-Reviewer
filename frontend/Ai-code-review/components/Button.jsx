import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={`px-4 py-2 rounded font-medium ${className}`} {...props}>
      {children}
    </button>
  );
};
