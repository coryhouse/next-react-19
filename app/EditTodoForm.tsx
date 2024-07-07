import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { useFormState } from "react-dom";
import { editTodo } from "./todoActions";
import { Button } from "@/components/Button";
import { SubmitButton } from "@/components/SubmitButton";
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

  if (todo.completed) {
    return (
      <Input
        type="text"
        disabled
        defaultValue={todo.title}
        error={editFormState?.titleError}
        className="border-none mr-2 bg-transparent line-through"
      />
    );
  }

  return isEditing ? (
    <form action={editTodoAction} className="flex grow-0">
      <input type="hidden" name="id" value={todo.id} />
      <Input
        type="text"
        name="title"
        defaultValue={todo.title}
        error={editFormState?.titleError}
        className="mr-2"
        onBlur={() => setIsEditing(false)}
      />
      <div>
        <SubmitButton loadingLabel="Saving...">Save</SubmitButton>
        <Button variant="text" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    <Input
      type="text"
      defaultValue={todo.title}
      onFocus={() => setIsEditing(true)}
      error={editFormState?.titleError}
      className="border-none mr-2 bg-transparent"
    />
  );
}
