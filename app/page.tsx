import { Suspense } from "react";
import Todos from "./Todos";
import { Spinner } from "@/components/Spinner";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl font-bold">Todos</h1>
      <Suspense fallback={<Spinner />}>
        <Todos />
      </Suspense>
    </main>
  );
}
