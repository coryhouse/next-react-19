"use client";
import { Todo as TodoType } from "@/types/todo";
import { AddTodoForm } from "./add-todo-form";
import { Todo } from "./todo";
import { useState } from "react";

type TodosProps = {
  todos: TodoType[];
};

export function Todos({ todos }: TodosProps) {
  const [optimisticTodos, setOptimisticTodos] = useState([...todos]);

  const addOptimisticTodo = (newTodo: string) => {
    setOptimisticTodos((state) => [
      ...state,
      {
        done: false,
        task: newTodo,
        status: "unsaved",
      },
    ]);
  };

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
