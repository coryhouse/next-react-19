"use client";
import { Todo as TodoType } from "./todo.types";
import { AddTodoForm } from "./add-todo-form";
import { Todo } from "./todo";
import { useState } from "react";

type TodosProps = {
  todos: TodoType[];
};

export function Todos({ todos }: TodosProps) {
  const [optimisticTodos, setOptimisticTodos] = useState([...todos]);

  const addOptimisticTodo = (task: string) => {
    setOptimisticTodos((state) => [
      ...state,
      {
        done: false,
        task,
        status: "unsaved",
      },
    ]);
  };

  return (
    <>
      <AddTodoForm
        addOptimisticTodo={addOptimisticTodo}
        removeOptimisticTodo={(task: string) => {
          setOptimisticTodos(optimisticTodos.filter((t) => t.task !== task));
        }}
        markOptimisticTodoComplete={(id: string, task: string) => {
          setOptimisticTodos((state) =>
            state.map((i) =>
              i.task === task ? { ...i, id, status: "saved" } : i
            )
          );
        }}
      />
      <ul className="mt-2">
        {optimisticTodos.map((todo) => (
          <Todo
            key={todo.task}
            todo={todo}
            setTodo={(todo) => {
              const newList = [
                ...optimisticTodos.map((t) =>
                  "id" in t && todo.id === t.id ? todo : t
                ),
              ];
              setOptimisticTodos(newList);
            }}
          />
        ))}
      </ul>
    </>
  );
}
