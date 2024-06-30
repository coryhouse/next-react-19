import { Suspense } from "react";
import Todos from "./Todos";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Todos</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Todos />
      </Suspense>
    </main>
  );
}
