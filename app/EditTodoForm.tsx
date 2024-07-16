import { emptyEditTodoFormState, Todo } from "@/types/todo";
import { useFormState } from "react-dom";
import { editTodo } from "./todoActions";
import Input from "@/components/Input";
import clsx from "clsx";
import { SaveAndCancelButtons } from "./SaveAndCancelButtons";

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
  const [editFormState, editTodoAction] = useFormState(
    editTodo,
    emptyEditTodoFormState
  );

  function submitButtons(visible = true) {
    return (
      <div className={clsx(visible ? "" : "invisible", "ml-2")}>
        <SubmitButton loadingLabel="Saving...">Save</SubmitButton>
        <Button variant="text" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    );
  }

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
    <form action={editTodoAction} className="flex grow-0">
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
