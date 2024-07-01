"use server";

import { revalidateTag } from "next/cache";
import { AddTodoFormState, emptyAddToDoFormState } from "./AddTodoForm";

export async function deleteTodo(formData: FormData) {
  const id = formData.get("id");
  await fetch("http://localhost:3001/todos/" + id, {
    method: "DELETE",
  });
  revalidateTag("todos");
}

// The function passed to useActionState receives an extra argument, the previous or initial state, as its first argument.
// This makes its signature different than if it were used directly as a form action without using useActionState
export async function addTodo(
  previousState: AddTodoFormState,
  formData: FormData
) {
  const title = formData.get("title");
  if (!title) return { ...previousState, titleError: "Title is required" };
  const resp = await fetch("http://localhost:3001/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
  await resp.json();
  revalidateTag("todos");
  return emptyAddToDoFormState;
}
