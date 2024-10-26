import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { editTodo } from "./todoActions";
import Input from "@/components/Input";
import clsx from "clsx";
import { SaveAndCancelButtons } from "./SaveAndCancelButtons";
import { useActionState } from "react";

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
  const [editFormState, editTodoAction, isPending] = useActionState(
    editTodo,
    emptyEditTodoFormState
  );

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
    <form action={editTodoAction} className="flex flex-row items-center grow-0">
      <input type="hidden" name="id" value={todo.id} />
      <Input
        autofocusOnFirstRender
        name="title"
        defaultValue={todo.title}
        error={editFormState?.titleError}
      />
      <SaveAndCancelButtons setIsEditing={setIsEditing} isEditing />
    </form>
  ) : (
    <>
      <Input
        defaultValue={todo.title}
        onFocus={() => setIsEditing(true)}
        className={readOnlyInputStyles}
      />
      <SaveAndCancelButtons
        visible={false}
        setIsEditing={setIsEditing}
        isEditing={false}
      />
    </>
  );
}
