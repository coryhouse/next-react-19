"use client";
import { Todo as TodoType } from "@/types/todo";
import { useOptimistic } from "react";
import { AddTodoForm } from "./add-todo-form";
import { Todo } from "./todo";
import { v4 as uuidv4 } from "uuid";

type TodosProps = {
  todos: TodoType[];
};

export function Todos({ todos }: TodosProps) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => [
      ...state,
      {
        completed: false,
        id: uuidv4(), // Temp id for the optimistic add. Real id is generated by the database.
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
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
