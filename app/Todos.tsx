import { AddTodoForm } from "./AddTodoForm";
import { SubmitButton } from "./SubmitButton";
import { deleteTodo } from "./actions";

export default async function Todos() {
  const resp = await fetch("http://localhost:3001/todos/", {
    cache: "no-store",
  });
  const todos = await resp.json();

  return (
    <>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id} className="flex">
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <SubmitButton
                className="border p-1 bg-slate-400 mr-2"
                label="Delete"
                loadingLabel="Deleting..."
              />
            </form>
            {todo.title}
          </li>
        ))}
      </ul>

      <AddTodoForm />
    </>
  );
}
