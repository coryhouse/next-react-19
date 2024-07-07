import DeleteButton from "@/components/DeleteButton";
import { deleteTodo, toggleComplete } from "./actions";
import { Todo as TodoType } from "@/types/todo";
import { useTransition } from "react";

type TodoProps = {
  todo: TodoType;
};

export function Todo({ todo }: TodoProps) {
  const [toggleIsPending, startTransition] = useTransition();

  return (
    <li key={todo.id} className="flex items-center">
      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <DeleteButton />
      </form>
      <input
        defaultChecked={todo.completed}
        onChange={() => {
          startTransition(async () => {
            await toggleComplete(todo.id);
          });
        }}
        type="checkbox"
        name="id"
        value={todo.id}
      />
      <span className="ml-2">{todo.title}</span>
      {(todo.saving || toggleIsPending) && (
        <span className="text-sm text-slate-400 ml-2">Saving...</span>
      )}
    </li>
  );
}
