import { z } from "zod";

export const taskSchema = z.string();

export const unsavedTodoSchema = z.object({
  task: taskSchema,
  done: z.boolean(),
});

export const savedTodoSchema = unsavedTodoSchema.extend({
  id: z.coerce.string(),
});

export type SavedTodo = z.infer<typeof savedTodoSchema>;
export type UnsavedTodo = z.infer<typeof unsavedTodoSchema>;

export type Todo = SavedTodo | UnsavedTodo;
