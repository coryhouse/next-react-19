import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { useFormState } from "react-dom";
import { editTodo } from "./todoActions";
import { Button } from "@/components/Button";
import { SubmitButton } from "@/components/SubmitButton";
import clsx from "clsx";
import Input from "@/components/Input";

type EditTodoFormProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  todo: Todo;
};

export function EditTodoForm({
  isEditing,
  setIsEditing,
  todo,
}: EditTodoFormProps) {
  const [editFormState, editTodoAction] = useFormState(
    editTodo,
    emptyEditTodoFormState
  );

  if (isEditing)
    return (
      <form action={editTodoAction} className="flex grow-0">
        <Input
          type="text"
          defaultValue={todo.title}
          error={editFormState?.titleError}
          className="mr-2"
        />
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        <SubmitButton loadingLabel="Saving...">Save</SubmitButton>
      </form>
    );

  return (
    <button
      onClick={() => setIsEditing(true)}
      className={clsx({ "line-through": todo.completed })}
    >
      {todo.title}
    </button>
  );
}
