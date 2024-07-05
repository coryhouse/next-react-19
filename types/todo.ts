import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  saving: z.boolean().optional(),
});

export type Todo = z.infer<typeof todoSchema>;

export const emptyAddToDoFormState: AddTodoFormState = {
  titleError: "",
};

export type AddTodoFormState = {
  titleError: string;
};
