"use client";
import { Todo as TodoType } from "@/types/todo";
import { useOptimistic } from "react";
import { AddTodoForm } from "./add-todo-form";
import { Todo } from "./todo";
import { todosReducer } from "./todosReducer";

type TodosProps = {
  todos: TodoType[];
};

export function Todos({ todos }: TodosProps) {
  const [optimisticTodos, dispatch] = useOptimistic(todos, todosReducer);

  return (
    <>
      <AddTodoForm dispatch={dispatch} />
      <ul className="mt-2">
        {optimisticTodos.map((todo) => (
          <Todo key={todo.task} todo={todo} dispatch={dispatch} />
        ))}
      </ul>
    </>
  );
}
