"use client";
import { Todo } from "@/types/todo";
import { deleteTodo } from "./actions";
import { useOptimistic } from "react";
import DeleteButton from "@/components/DeleteButton";
import { AddTodoForm } from "./AddTodoForm";

type TodosProps = {
  todos: Todo[];
};

export function Todos({ todos }: TodosProps) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => [
      ...state,
      {
        completed: false,
        id: state.length + 1, // TODO: Improve.
        title: newTodo,
        saving: true, // bool that tracks if the todo is currently in the process of saving
      },
    ]
  );

  return (
    <>
      <AddTodoForm addOptimisticTodo={addOptimisticTodo} />
      <ul className="mt-2">
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="flex items-center">
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <DeleteButton />
            </form>
            {/* <form ref={toggleFormRef} action={toggleComplete}>
              <input
                onChange={toggleFormRef.current?.submit}
                type="checkbox"
                name="id"
                value={todo.id}
              />
            </form> */}
            <span className="ml-2">{todo.title}</span>
            {todo.saving && (
              <span className="text-sm text-slate-400 ml-2">Saving...</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
