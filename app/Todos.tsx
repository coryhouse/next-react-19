import { DeleteTodoButton } from "./DeleteTodoButton";

export default async function Todos() {
  const resp = await fetch("http://localhost:3001/todos/", {
    cache: "no-store",
  });
  const todos = await resp.json();

  async function deleteTodo(formData: FormData) {
    "use server";
    const id = formData.get("id");
    fetch("http://localhost:3001/todos/" + id, {
      method: "DELETE",
    });
  }

  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title");
    const resp = await fetch("http://localhost:3001/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });
    const todo = await resp.json();
    return todo;
  }

  return (
    <>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <DeleteTodoButton />
            </form>
            {todo.title}
          </li>
        ))}
      </ul>

      <form action={addTodo}>
        <input type="text" name="title" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
