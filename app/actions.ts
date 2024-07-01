"use server";
export async function deleteTodo(formData: FormData) {
  const id = formData.get("id");
  fetch("http://localhost:3001/todos/" + id, {
    method: "DELETE",
  });
}

export async function addTodo(formData: FormData) {
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
