import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg shadow-md bg-card p-4 ${className}`}>
      {children}
    </div>
  );
};
