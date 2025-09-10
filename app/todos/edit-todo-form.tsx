import {
  emptyEditTodoFormState,
  type EditTodoFormState,
  type SavedTodo,
} from "./todo.types";
import { editTodo } from "./todo-actions";
import Input from "@/components/Input";
import clsx from "clsx";
import { useActionState, useRef } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);

  // Wrap the server action to handle success immediately
  const wrappedEditTodo = async (
    currentState: EditTodoFormState,
    formData: FormData
  ) => {
    const result = await editTodo(currentState, formData);

    if (result.status === "success") {
      formRef.current?.reset();
      setIsEditing(false);
      toast.success("Todo saved.");
    }

    return result;
  };

  const [formState, editTodoAction, isPending] = useActionState(
    wrappedEditTodo,
    emptyEditTodoFormState
  );

  // 2. formRef
  // Could just handle via JS instead of useActionState since our fancy form requires JS to function anyway
  // if (formRef.current && formState.status === "success") {
  //   setIsEditing(false);
  //   toast.success("Todo saved.");
  //   formRef.current.reset();
  // }

  // 3. Handle async logic in the form action. (See add-todo-form)

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
