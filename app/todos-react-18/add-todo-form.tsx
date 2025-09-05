import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useRef, useState } from "react";
import { emptyAddToDoFormState, taskSchema } from "@/types/todo";

type AddTodoFormProps = {
  addOptimisticTodo: (task: string) => void;
};

export function AddTodoForm({ addOptimisticTodo }: AddTodoFormProps) {
  const [formState, setFormState] = useState(emptyAddToDoFormState);
  const [isPending, setIsPending] = useState(false);

  async function addTodo(formData: FormData) {
    const task = formData.get("task");
    if (!task) return { error: "Task is required" };
    try {
      setIsPending(true);
      const resp = await fetch("http://localhost:3001/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, done: false }),
      });
      await resp.json();
      setFormState(emptyAddToDoFormState);
      setIsPending(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setFormState({ ...formState, error: "Failed to add '" + task + "'." });
    }
  }

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const task = taskSchema.parse("task");
        if (task) {
          // Only add optimistic todo if task is not empty. This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
          addOptimisticTodo(task);
          formRef.current?.reset(); // Clear form immediately upon submit rather than waiting for the optimistic add to complete (at which point React would reset automatically)
        }
        addTodo(formData);
      }}
    >
      <Input
        id="task"
        label="Task"
        type="text"
        name="task"
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
