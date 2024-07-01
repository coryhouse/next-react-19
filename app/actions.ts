"use server";
export async function deleteTodo(formData: FormData) {
  const id = formData.get("id");
  fetch("http://localhost:3001/todos/" + id, {
    method: "DELETE",
  });
}

// The function passed to useActionState receives an extra argument, the previous or initial state, as its first argument.
// This makes its signature different than if it were used directly as a form action without using useActionState
export async function addTodo(previousState, formData: FormData) {
  const title = formData.get("title");
  if (!title) return { titleError: "Title is required" };
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
