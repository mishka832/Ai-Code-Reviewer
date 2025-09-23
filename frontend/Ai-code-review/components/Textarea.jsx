import React from "react";

export const Textarea = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`code-editor w-full min-h-[400px] p-4 rounded-lg border border-border bg-code-bg text-foreground placeholder:text-muted-foreground font-mono text-sm focus:ring-primary focus:border-primary ${className}`}
      spellCheck={false}
    />
  );
};
