import { z } from "zod";

export const taskSchema = z.string();

export const unsavedTodoSchema = z.object({
  status: z.literal("unsaved"),
  task: taskSchema,
  completed: z.boolean(),
});

export const savedTodoSchema = z.object({
  id: z.coerce.string(),
  task: taskSchema,
  completed: z.boolean(),
  // Optional because the db doesn't contain this field.
  status: z.literal("saved").optional(),
});

export type SavedTodo = z.infer<typeof savedTodoSchema>;
export type UnsavedTodo = z.infer<typeof unsavedTodoSchema>;

export type Todo = SavedTodo | UnsavedTodo;

export const emptyAddToDoFormState: AddTodoFormState = {
  task: "",
  error: "",
};

export type AddTodoFormState = {
  task: string;
  error: string;
};

export type EditTodoFormState =
  | {
      status: "idle";
    }
  | {
      status: "success";
      resetKey: string;
    }
  | {
      status: "error";
      errors: {
        task: string;
      };
    };

export const emptyEditTodoFormState: EditTodoFormState = {
  status: "idle",
};
