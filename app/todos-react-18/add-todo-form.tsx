import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { taskSchema } from "./todo.types";
import { toast } from "sonner";

export type AddTodoFormState = {
  task: string;
  error: string;
};

export const emptyAddToDoFormState: AddTodoFormState = {
  task: "",
  error: "",
};

type AddTodoFormProps = {
  addOptimisticTodo: (task: string) => void;
  markOptimisticTodoComplete: (id: string, task: string) => void;
  removeOptimisticTodo: (task: string) => void;
};

export function AddTodoForm({
  addOptimisticTodo,
  markOptimisticTodoComplete,
  removeOptimisticTodo,
}: AddTodoFormProps) {
  const [formState, setFormState] = useState(emptyAddToDoFormState);
  const [isPending, setIsPending] = useState(false);

  async function addTodo(event: React.FormEvent) {
    event.preventDefault();
    const { task } = formState;
    if (task) {
      // Only add optimistic todo if task is not empty. This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
      addOptimisticTodo(task);
      setFormState(emptyAddToDoFormState); // Clear form immediately upon submit rather than waiting for the optimistic add to complete (at which point React would reset automatically)
      try {
        setIsPending(true);
        const resp = await fetch("http://localhost:3001/tod3os", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task, done: false }),
        });
        if (!resp.ok) throw resp;
        const savedTodo = await resp.json();
        markOptimisticTodoComplete(savedTodo.id, task);
        toast.success("Todo saved!");
      } catch (_error) {
        setFormState({
          ...formState,
          error: "Failed to add '" + task + "'.",
        });
        removeOptimisticTodo(task);
        toast.error("Add failed.");
      } finally {
        setIsPending(false);
      }
    }
  }

  return (
    <form onSubmit={addTodo}>
      <Input
        id="task"
        label="Task"
        type="text"
        value={formState.task}
        onChange={(e) =>
          setFormState({
            task: e.target.value,
            error: taskSchema.safeParse(e.target.value).success
              ? ""
              : "Task must be a string.",
          })
        }
        disabled={isPending}
        error={isPending ? undefined : formState.error}
        afterSlot={
          <Button type="submit" className="ml-2">
            Add
          </Button>
        }
      />
      <p role="alert" className="h-4 text-red-500">
        {!isPending && formState.error}
      </p>
    </form>
  );
}
