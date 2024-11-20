import { z } from "zod";

export const newUnsavedTodoSchema = z.object({
  status: z.literal("unsaved"),
  title: z.string(),
  completed: z.boolean(),
});

export const todoSchema = z.object({
  id: z.coerce.string(),
  title: z.string(),
  completed: z.boolean(),
  // Optional because the db doesn't contain this field.
  status: z.literal("saved").optional(),
});

export type Todo =
  | z.infer<typeof todoSchema>
  | z.infer<typeof newUnsavedTodoSchema>;

export const emptyAddToDoFormState: AddTodoFormState = {
  titleError: "",
};

export type AddTodoFormState = {
  titleError: string;
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
        title: string;
      };
    };

export const emptyEditTodoFormState: EditTodoFormState = {
  status: "idle",
};
