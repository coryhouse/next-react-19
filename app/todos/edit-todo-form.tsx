import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { editTodo } from "./todo-actions";
import Input from "@/components/Input";
import clsx from "clsx";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import LoadingIndicator from "@/components/LoadingIndicator";
import { toast } from "sonner";

type EditTodoFormProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  todo: SavedTodo;
};

const readOnlyInputStyles = "border-white bg-transparent";

export function EditTodoForm({
  isEditing,
  setIsEditing,
  todo,
}: EditTodoFormProps) {
  const [formState, editTodoAction, isPending] = useActionState(
    editTodo,
    emptyEditTodoFormState
  );
  const formRef = useRef<HTMLFormElement>(null);

  const formResetKey =
    formState.status === "success" ? formState.resetKey : undefined;

  // 4 ways to handle updating form state after submit when using useActionState
  // 1. useEffect with resetKey returned from the action (timestamp) as suggested here: https://stackoverflow.com/a/78249448/26180
  useEffect(() => {
    if (formState.status === "success") {
      formRef.current?.reset();
      setIsEditing(false);
      toast.success("Todo saved.");
    }
  }, [formState.status, formResetKey, setIsEditing]);

  // 2. formRef
  // Could just handle via JS instead of useActionState since our fancy form requires JS to function anyway
  // if (formRef.current && formState.status === "success") {
  //   setIsEditing(false);
  //   toast.success("Todo saved.");
  //   formRef.current.reset();
  // }

  // 3. Handle async logic in the form action. (See AddToDoForm)

  // 4. Don't useActionState. Just useTransition instead of useActionState since the form requires JS to function anyway. https://stackoverflow.com/a/78249448/26180

  if (todo.done) {
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
      <input
        type="hidden"
        name="id"
        value={todo.status === "saved" ? todo.id : ""}
      />
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
