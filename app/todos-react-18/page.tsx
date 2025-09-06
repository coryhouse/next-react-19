"use client";
import { useEffect, useState } from "react";
import { Todos } from "./todos";
import { Spinner } from "@/components/Spinner";
import { savedTodoSchema } from "./todo.types";
import { Todo as TodoType } from "./todo.types";

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const resp = await fetch("http://localhost:3001/todos/");
        const parsed = savedTodoSchema.array().parse(await resp.json());
        setTodos(parsed);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, []);

  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <>
      <title>Todos</title>
      <h1>Todos</h1>
      <Todos todos={todos} />
    </>
  );
}
