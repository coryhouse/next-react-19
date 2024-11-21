import { Suspense } from "react";
import { Todos } from "./todos";
import { Spinner } from "@/components/Spinner";
import { savedTodoSchema } from "@/types/todo";

export default async function Home() {
  return (
    <>
      <title>Todos</title>
      <h1>Todos</h1>
      <Suspense fallback={<Spinner />}>
        <FetchTodos />
      </Suspense>
    </>
  );
}

async function FetchTodos() {
  // NOTE: The trailing slash is required for the fetch to work
  const resp = await fetch("http://localhost:3001/todos/");
  const todos = savedTodoSchema.array().parse(await resp.json());
  return <Todos todos={todos} />;
}
