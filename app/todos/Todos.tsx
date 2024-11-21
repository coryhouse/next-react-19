"use client";
import { Todo as TodoType } from "@/types/todo";
import { useOptimistic } from "react";
import { AddTodoForm } from "./add-todo-form";
import { Todo } from "./todo";

type TodosProps = {
  todos: TodoType[];
};

export function Todos({ todos }: TodosProps) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, task: string) => [
      ...state,
      {
        task,
        completed: false,
        status: "unsaved" as const,
      },
    ]
  );

  return (
    <>
      <AddTodoForm addOptimisticTodo={addOptimisticTodo} />
      <ul className="mt-2">
        {optimisticTodos.map((todo) => (
          <Todo key={todo.task} todo={todo} />
        ))}
      </ul>
    </>
  );
}
