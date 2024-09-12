import React from "react";
import clsx from "clsx";
import { Spinner } from "../";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void; // onClick puede ser opcional
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { text, isLoading = false, disabled = false, onClick, className, ...props },
    ref
  ) => {
    const isButtonDisabled = isLoading || disabled;

    return (
      <button
        className={clsx(
          "flex h-10 justify-center items-center select-none w-full bg-gray-600 rounded-full text-white",
          "hover:bg-gray-700",
          "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300",
          className
        )}
        onClick={isButtonDisabled ? undefined : onClick}
        ref={ref}
        disabled={isButtonDisabled}
        {...props}
      >
        {isLoading ? <Spinner size={"5"} color={"text-white"} /> : text}
      </button>
    );
  }
);
