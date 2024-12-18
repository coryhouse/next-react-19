import cx from "clsx";
import Label from "./Label";
import { useEffect, useRef } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  /** Input label */
  label?: string;

  /** Set to true to highlight the label so that it is visually marked as changed from the default. */
  changed?: boolean;

  /** Specify input's width */
  width?: "full" | "default";

  /** Validation error to display below the input. When provided, the input is also styled in red. */
  error?: string;

  /** Display content inline after the input */
  afterSlot?: React.ReactNode;

  /** Set to true to autofocus the input on the first render */
  autofocusOnFirstRender?: boolean;
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
    afterSlot,
    autofocusOnFirstRender,
    ...rest
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocusOnFirstRender) {
      ref.current?.focus();
    }
  }, [autofocusOnFirstRender]);

  return (
    <div>
      {label && (
        <Label className="block" htmlFor={id}>
          {label}
        </Label>
      )}
      <input
        ref={ref}
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
      {afterSlot}
    </div>
  );
}
