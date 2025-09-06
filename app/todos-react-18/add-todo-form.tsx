import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { emptyAddToDoFormState, taskSchema } from "./todo.types";

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
        const resp = await fetch("http://localhost:3001/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task, done: false }),
        });
        const savedTodo = await resp.json();
        markOptimisticTodoComplete(savedTodo.id, task);
      } catch (_error) {
        setFormState({
          ...formState,
          error: "Failed to add '" + task + "'.",
        });
        removeOptimisticTodo(task);
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
