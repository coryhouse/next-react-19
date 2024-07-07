import { Suspense } from "react";
import { Todos } from "./Todos";
import { Spinner } from "@/components/Spinner";
import { todoSchema } from "@/types/todo";

export default async function Home() {
  return (
    <main className="grid place-content-center mt-4">
      <h1 className="text-xl font-bold">Todos</h1>
      <Suspense fallback={<Spinner />}>
        <FetchTodos />
      </Suspense>
    </main>
  );
}

async function FetchTodos() {
  // NOTE: The trailing slash is required for the fetch to work
  const resp = await fetch("http://localhost:3001/todos/", {
    cache: "no-store",
    next: { tags: ["todos"] },
  });
  const todos = todoSchema.array().parse(await resp.json());
  return <Todos todos={todos} />;
}
