import DeleteButton from "@/components/DeleteButton";
import { deleteTodo, toggleComplete } from "./todoActions";
import { Todo as TodoType } from "@/types/todo";
import { useTransition } from "react";
import clsx from "clsx";

type TodoProps = {
  todo: TodoType;
};

export function Todo({ todo }: TodoProps) {
  const [isTogglePending, startToggleTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const isPending = isTogglePending || isDeletePending;

  return (
    <li
      key={todo.id}
      className={clsx("flex items-center", {
        "opacity-30": isPending,
        "pointer-events-none": isPending,
      })}
    >
      {/* Must useTransition instead of a form here so we can "see" the delete is in progress above. We would need a form tag for each todo, but the form would have to be above the ul for us to read the form's status via useFormStatus. And the <form> can't be a child of <ul>, because that's invalid HTML. Thus, useTransition is our only option here. */}
      <DeleteButton
        onClick={() => {
          startDeleteTransition(() => deleteTodo(todo.id));
        }}
      />
      <input
        defaultChecked={todo.completed}
        onChange={() => {
          startToggleTransition(async () => {
            await toggleComplete(todo.id, !todo.completed);
          });
        }}
        type="checkbox"
        name="id"
        value={todo.id}
      />
      <span className={clsx("ml-2", { "line-through": todo.completed })}>
        {todo.title}
      </span>
      {(todo.saving || isTogglePending) && (
        <span className="text-sm text-slate-400 ml-2">Saving...</span>
      )}
    </li>
  );
}