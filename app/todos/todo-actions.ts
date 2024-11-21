"use server";

import {
  AddTodoFormState,
  EditTodoFormState,
  emptyAddToDoFormState,
  taskSchema,
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
    task: z.string(),
    id: z.coerce.number(),
  });

  const { id, task } = editSchema.parse(Object.fromEntries(formData));
  if (!task) return { errors: { task: "Task is required" }, status: "error" };

  const resp = await fetch(baseUrl + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  if (!resp.ok) {
    return {
      errors: { task: "Failed to edit '" + task + "'." },
      status: "error",
    };
  }
  await resp.json();
  revalidateTag("todos");
  return { status: "success", resetKey: new Date().toString() };
}

export async function deleteTodo(todoId: string) {
  await fetch(baseUrl + todoId, {
    method: "DELETE",
  });
  revalidateTag("todos");
}

export async function toggleComplete(todoId: string, done: boolean) {
  const resp = await fetch(baseUrl + todoId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  });
  if (!resp.ok) {
    throw new Error("Failed to toggle");
  }
  await resp.json();
  revalidateTag("todos");
}

// The function passed to useActionState receives an extra argument, the previous or initial state, as its first argument.
// This makes its signature different than if it were used directly as a form action without using useActionState
export async function addTodo(
  currentState: AddTodoFormState,
  formData: FormData
): Promise<AddTodoFormState> {
  const task = taskSchema.parse(formData.get("task"));
  if (!task) return { task: currentState.task, error: "Task required" };
  const resp = await fetch("http://localhost:3001/tods/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, done: false }),
  });
  if (!resp.ok) {
    return { ...currentState, error: "Failed to add todo" };
  }
  await resp.json();
  revalidateTag("todos");
  return emptyAddToDoFormState;
}
