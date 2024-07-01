import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  /** Setting this to true does the following:
   * - Display a loading spinner
   * - Set aria-disabled to true
   * - Ignore clicks */
  isLoading: boolean;

  /** Label to display instead of children when isLoading is true. By convention, we end this message with "ing..." to signify that we're waiting. For example, if the children prop is "Save", set this to "Saving..." */
  loadingLabel: string;

  /** Automatically true when `isLoading` is true. Setting this to true does the following:
   * - Display the button a gray color
   * - Set aria-disabled to true
   * - Ignore clicks */
  isDisabled?: boolean;
}

export function Button({
  isLoading,
  loadingLabel,
  isDisabled = false,
  children,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        if (isLoading) return;
        buttonProps.onClick?.(e);
      }}
      aria-disabled={isLoading || isDisabled}
      {...buttonProps}
    >
      {isLoading ? (
        <div className="flex-row gap-1 align-middle">
          <Spinner />
          {loadingLabel}
        </div>
      ) : (
        children
      )}{" "}
    </button>
  );
}
