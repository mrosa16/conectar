import { useFormContext } from "react-hook-form";
import type { ButtonProps } from "./Button.types";
import classNames from "classnames";

function Button({
  children,
  type = "submit",
  variant = "primary",
  loading = false,
  className,
  ...rest
}: ButtonProps) {
  const { formState } = useFormContext();

  const isDisabled = loading || formState.isSubmitting;

  const baseStyle =
    "px-4 py-2 rounded font-medium transition-colors duration-200 ";

  const variants = {
    primary:
      "bg-(--color-orange) text-(--color-white) hover:bg-orange-bright  ",
    secondary: "bg-gray text-black hover:bg-dark-gray",
  };
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={classNames(
        baseStyle,
        variants[variant],
        isDisabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {loading || formState.isSubmitting ? "Enviando..." : children}
    </button>
  );
}

export default Button;
