import { SubmitButton } from "./SubmitButton";
import { addTodo, deleteTodo } from "./actions";

export default async function Todos() {
  const resp = await fetch("http://localhost:3001/todos/", {
    cache: "no-store",
  });
  const todos = await resp.json();

  return (
    <>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <SubmitButton label="Delete" loadingLabel="Deleting..." />
            </form>
            {todo.title}
          </li>
        ))}
      </ul>

      <form action={addTodo}>
        <input type="text" name="title" />
        <SubmitButton label="Add" loadingLabel="Adding..." />
      </form>
    </>
  );
}
