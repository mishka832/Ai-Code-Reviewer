import React from "react";

export const CodeEditor = ({
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`code-editor min-h-[400px] resize-none font-mono text-sm
          bg-code-bg border-code-border
          focus:ring-primary focus:border-primary
          text-foreground placeholder:text-muted-foreground
          ${className}`}
        spellCheck={false}
      />

      {/* Line numbers overlay */}
      <div className="absolute top-3 right-3 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
        Code Editor
      </div>
    </div>
  );
};
