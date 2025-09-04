import { Spinner } from "./Spinner";
import cx from "clsx";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "icon" | "text";

  /** Setting this to true does the following:
   * - Display a loading spinner
   * - Set aria-disabled to true
   * - Ignore clicks */
  isLoading?: boolean;

  /** Label to display instead of children when isLoading is true. By convention, we end this message with "ing..." to signify that we're waiting. For example, if the children prop is "Save", set this to "Saving..." */
  loadingLabel?: string;

  /** Automatically true when `isLoading` is true. Setting this to true does the following:
   * - Display the button a gray color
   * - Set aria-disabled to true
   * - Ignore clicks */
  disabled?: boolean;
}

export function Button({
  className,
  variant = "primary",
  isLoading = false,
  loadingLabel = "",
  disabled = false,
  children,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(className, "p-1 rounded", {
        "bg-blue-600 text-white border border-slate-400": variant === "primary",
        "bg-slate-200 border border-slate-400": variant === "secondary",
        "bg-white border-none p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100":
          variant === "icon",
        "bg-inherit border-none text-gray-400": variant === "text",
      })}
      onClick={(e) => {
        if (isLoading) return;
        buttonProps.onClick?.(e);
      }}
      aria-disabled={isLoading || disabled}
      {...buttonProps}
    >
      {isLoading ? (
        <div className="inline-flex gap-1 align-middle flex-nowrap">
          <Spinner /> {loadingLabel}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
