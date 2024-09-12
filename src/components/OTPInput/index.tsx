import clsx from "clsx";
import React, { forwardRef } from "react";

interface OTPInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  maxLength: number;
  error?: boolean;
}

export const OTPInput = forwardRef<HTMLInputElement, OTPInputProps>(
  ({ value, onChange, onKeyDown, onClick, onPaste, maxLength, error }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onPaste={onPaste}
        maxLength={maxLength}
        className={clsx(
          "flex h-14 w-14 justify-center text-center items-center select-none bg-gray-700 rounded-md text-white text-2xl",
          "hover:bg-gray-700",
          value ? "caret-transparent" : "caret-white",
          !error && "focus:ring-2 focus:ring-blue-500",
          error ? "ring-2 ring-red-500" : "ring-2 ring-transparent"
        )}
        placeholder="0"
      />
    );
  }
);

OTPInput.displayName = "OTPInput";
