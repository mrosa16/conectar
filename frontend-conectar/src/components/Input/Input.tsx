import { forwardRef } from "react";
import type { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-(--color-gray-text)">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-teal-600"
          }`}
          {...rest}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

export default Input;
