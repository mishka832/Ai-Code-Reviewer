import React from "react";

export const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
};
