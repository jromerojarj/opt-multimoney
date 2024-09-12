import React from "react";

interface SpinnerProps {
  size?: string;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "5",
  color = "text-white",
}) => {
  return (
    <div className={`flex w-${size}`}>
      <svg
        className={`animate-spin w-5 h-5 ${color}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    </div>
  );
};
