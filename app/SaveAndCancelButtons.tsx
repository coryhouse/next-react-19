import { Button } from "@/components/Button";
import clsx from "clsx";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

type SaveAndCancelButtonsProps = {
  visible?: boolean;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};

export function SaveAndCancelButtons({
  visible = true,
  setIsEditing,
  isEditing,
}: SaveAndCancelButtonsProps) {
  const { pending } = useFormStatus();
  const isSavingRef = useRef(false);

  // TODO: Instead, setIsEditing to false when the action completes.
  //   useLayoutEffect(() => {
  //     if (isEditing && !pending && isSavingRef.current) {
  //       setIsEditing(false);
  //       isSavingRef.current = false;
  //     } else if (isEditing && pending && !isSavingRef.current) {
  //       isSavingRef.current = true;
  //     }
  //   }, [isEditing, pending, setIsEditing]);

  if (pending) {
    return <div className="ml-2 text-sm text-slate-400">Saving...</div>;
  }

  return (
    <div className={clsx(visible ? "" : "invisible", "ml-2")}>
      <Button type="submit">Save</Button>
      <Button variant="text" onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
    </div>
  );
}
