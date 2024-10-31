"use client";
import { Todo as TodoType } from "@/types/todo";
import { useOptimistic } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { Todo } from "./Todo";
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
        id: uuidv4(), // This is just a temporary id for the optimistic add. The real id is generated by the database.
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
