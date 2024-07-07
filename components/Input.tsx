import cx from "clsx";
import Label from "./Label";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  /** Input label */
  label?: string;

  /** Set to true to highlight the label so that it is visually marked as changed from the default. */
  changed?: boolean;

  /** Specify input's width */
  width?: "full" | "default";

  /** Validation error to display below the input. When provided, the input is also styled in red. */
  error?: string;
}

export default function Input(props: InputProps) {
  const {
    id,
    onChange,
    label,
    value,
    changed = false,
    className,
    error = "",
    width = "default",
    ...rest
  } = props;
  return (
    <div>
      <span>
        {label && (
          <Label className="block" htmlFor={id}>
            {label}
          </Label>
        )}
        <input
          className={cx(
            "border-solid border rounded p-1",
            error ? "border-red-500" : "border-slate-400",
            { "bg-yellow-100": changed },
            { "w-full": width === "full" },
            className
          )}
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </span>
      <p role="alert" className="text-red-500 h-4">
        {error}
      </p>
    </div>
  );
}
