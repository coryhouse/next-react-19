import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { editTodo } from "./todo-actions";
import Input from "@/components/Input";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import LoadingIndicator from "@/components/LoadingIndicator";
import { toast } from "sonner";

type EditTodoFormProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  todo: Todo;
};

const readOnlyInputStyles = "border-white bg-transparent";

export function EditTodoForm({
  isEditing,
  setIsEditing,
  todo,
}: EditTodoFormProps) {
  const [formState, setFormState] = useState(emptyEditTodoFormState);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formResetKey =
    formState.status === "success" ? formState.resetKey : undefined;

  useEffect(() => {
    if (formState.status === "success") {
      formRef.current?.reset();
      setIsEditing(false);
      toast.success("Todo saved.");
    }
  }, [formState.status, formResetKey, setIsEditing]);

  if (todo.completed) {
    return (
      <Input
        disabled
        defaultValue={todo.task}
        className={clsx(readOnlyInputStyles, "line-through")}
      />
    );
  }

  return isEditing ? (
    <form
      ref={formRef}
      action={editTodoAction}
      className="flex flex-row items-center grow-0"
    >
      <input type="hidden" name="id" value={todo.id} />
      <Input
        autofocusOnFirstRender
        name="task"
        defaultValue={todo.task}
        error={formState.status === "error" ? formState.errors.task : undefined}
      />
      <div className="ml-2">
        <Button type="submit">{isPending ? "Saving..." : "Save"}</Button>
        <Button variant="text" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
      {isPending && <LoadingIndicator />}
    </form>
  ) : (
    <Input
      defaultValue={todo.task}
      onFocus={() => setIsEditing(true)}
      className={readOnlyInputStyles}
    />
  );
}
