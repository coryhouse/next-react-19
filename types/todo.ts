import { z } from "zod";

export const todoSchema = z.object({
  id: z.coerce.string(),
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
