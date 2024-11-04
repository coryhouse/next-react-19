"use server";

import {
  AddTodoFormState,
  EditTodoFormState,
  emptyAddToDoFormState,
} from "@/types/todo";
import { revalidateTag } from "next/cache";
import { z } from "zod";

// NOTE: The trailing slash is required for the fetch to work. Not sure why.
const baseUrl = "http://localhost:3001/todos/";

export async function editTodo(
  currentState: EditTodoFormState,
  formData: FormData
): Promise<EditTodoFormState> {
  const editSchema = z.object({
    title: z.string(),
    id: z.coerce.number(),
  });

  const { id, title } = editSchema.parse(Object.fromEntries(formData));

  if (!title)
    return { errors: { title: "Title is required" }, status: "error" };

  try {
    const resp = await fetch(baseUrl + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    await resp.json();
    revalidateTag("todos");
    return { status: "success", resetKey: new Date().toString() };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      errors: { title: "Failed to edit '" + title + "'." },
      status: "error",
    };
  }
}

export async function deleteTodo(todoId: string) {
  await fetch(baseUrl + todoId, {
    method: "DELETE",
  });
  revalidateTag("todos");
}

export async function toggleComplete(todoId: string, completed: boolean) {
  const resp = await fetch(baseUrl + todoId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
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
    revalidateTag("todos");
    return emptyAddToDoFormState;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return {
      titleError: "Failed to add '" + title + "'.",
    };
  }
}
