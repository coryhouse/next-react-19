import { z } from "zod";

export const taskSchema = z.string();

export const unsavedTodoSchema = z.object({
  status: z.literal("unsaved"),
  task: taskSchema,
  done: z.boolean(),
});

export const savedTodoSchema = z.object({
  id: z.coerce.string(),
  task: taskSchema,
  done: z.boolean(),
  // Using this because toggling the task's status is only allowed when it's saved.
  // Optional because the DB doesn't contain this field.
  status: z.literal("saved").optional().default("saved"),
});

export type SavedTodo = z.infer<typeof savedTodoSchema>;
export type UnsavedTodo = z.infer<typeof unsavedTodoSchema>;

export type Todo = SavedTodo | UnsavedTodo;
