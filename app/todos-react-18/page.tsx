"use client";
import { useEffect, useState } from "react";
import { Todos } from "./todos";
import { Spinner } from "@/components/Spinner";
import { savedTodoSchema } from "@/types/todo";
import { Todo as TodoType } from "@/types/todo";

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      const resp = await fetch("http://localhost:3001/todos/");
      const parsedResp = savedTodoSchema.array().parse(await resp.json());
      setTodos(parsedResp);
      setIsLoading(false);
    }
    fetchTodos();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <title>Todos</title>
      <h1>Todos</h1>
      <Todos todos={todos} />;
    </>
  );
}
