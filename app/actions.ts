"use server";

import { AddTodoFormState, emptyAddToDoFormState } from "@/types/todo";
import { revalidateTag } from "next/cache";

// NOTE: The trailing slash is required for the fetch to work. Not sure why.
const baseUrl = "http://localhost:3001/todos/";

export async function deleteTodo(formData: FormData) {
  const id = formData.get("id");
  await fetch(baseUrl + id, {
    method: "DELETE",
  });
  revalidateTag("todos");
}

export async function toggleComplete(todoId: number) {
  const resp = await fetch(baseUrl + todoId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: true }),
  });
  await resp.json();
  revalidateTag("todos");
}

// The function passed to useActionState receives an extra argument, the previous or initial state, as its first argument.
// This makes its signature different than if it were used directly as a form action without using useActionState
export async function addTodo(
  currentState: AddTodoFormState,
  formData: FormData
) {
  const title = formData.get("title");
  if (!title) return { titleError: "Title is required" };
  try {
    const resp = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });
    await resp.json();
    // Uncomment this to try out the error handling
    // throw new Error("Failed to add todo");
    revalidateTag("todos");
    return emptyAddToDoFormState;
  } catch (error) {
    return {
      titleError: "Failed to add '" + title + "'.",
    };
  }
}
