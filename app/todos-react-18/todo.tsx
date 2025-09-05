import DeleteButton from "@/components/DeleteButton";
import { deleteTodo, toggleComplete } from "./todo-actions";
import { Todo as TodoType } from "@/types/todo";
import { useState, useTransition } from "react";
import clsx from "clsx";
import { EditTodoForm } from "./edit-todo-form";
import { toast } from "sonner";
import LoadingIndicator from "@/components/LoadingIndicator";

type TodoProps = {
  todo: TodoType;
};

export function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTogglePending, setIsTogglePending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const isPending =
    isTogglePending || isDeletePending || todo.status === "unsaved";

  return (
    <li
      className={clsx("flex flex-row items-center pt-1 pb-1", {
        "opacity-30": isPending,
        "pointer-events-none": isPending,
      })}
    >
      {/* Must useTransition instead of a form here so we can "see" the delete is in progress above. We would need a form tag for each todo, but the form would have to be above the ul for us to read the form's status via useFormStatus. And the <form> can't be a child of <ul>, because that's invalid HTML. Thus, useTransition is our only option here. */}
      <DeleteButton
        aria-label={`Delete ${todo.task}`}
        onClick={async () => {
          if (todo.status !== "saved") return; // just here to narrow type. Shouldn't be possible to click delete on an unsaved todo anyway.
          setIsEditing(false);
          toast.success("Todo deleted");
          setIsDeletePending(true);
          await deleteTodo(todo.id);
          setIsDeletePending(false);
        }}
      />
      {todo.status === "saved" && (
        <input
          className="mr-2"
          defaultChecked={todo.done}
          onChange={async () => {
            toast.success("Todo toggled");
            setIsTogglePending(true);
            setIsEditing(false);
            await toggleComplete(todo.id, !todo.done);
            setIsTogglePending(false);
          }}
          type="checkbox"
          name="id"
          value={todo.id}
        />
      )}

      <EditTodoForm
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        todo={todo}
      />

      {isPending && <LoadingIndicator />}
    </li>
  );
}
