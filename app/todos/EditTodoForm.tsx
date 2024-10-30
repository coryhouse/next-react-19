import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { editTodo } from "./todoActions";
import Input from "@/components/Input";
import clsx from "clsx";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import LoadingIndicator from "@/components/LoadingIndicator";

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
  const [formState, editTodoAction, isPending] = useActionState(
    editTodo,
    emptyEditTodoFormState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // 3 ways to handle updating form state after submit
  // 1. useEffect with resetKey returned from the action (timestamp) as suggested here: https://stackoverflow.com/a/78249448/26180
  useEffect(() => {
    if (formState.status === "success") {
      formRef.current?.reset();
      setIsEditing(false);
    }
  }, [formState.resetKey, formState.status]);

  // 2. formRef
  // Could just handle via JS instead of useActionState since our fancy form requires JS to function anyway
  // if (formRef.current && formState.status === "success") {
  //   setIsEditing(false);
  // }

  // 3. Just useTransition instead of useActionState since the form requires JS to function anyway. https://stackoverflow.com/a/78249448/26180

  if (todo.completed) {
    return (
      <Input
        disabled
        defaultValue={todo.title}
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
        name="title"
        defaultValue={todo.title}
        error={formState?.titleError}
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
      defaultValue={todo.title}
      onFocus={() => setIsEditing(true)}
      className={readOnlyInputStyles}
    />
  );
}
