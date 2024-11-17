import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useRef, useState } from "react";
import { emptyAddToDoFormState } from "@/types/todo";

type AddTodoFormProps = {
  addOptimisticTodo: (title: string) => void;
};

export function AddTodoForm({ addOptimisticTodo }: AddTodoFormProps) {
  const [formState, setFormState] = useState(emptyAddToDoFormState);
  const [isPending, setIsPending] = useState(false);

  async function addTodo(formData: FormData) {
    const title = formData.get("title");
    if (!title) return { titleError: "Title is required" };
    try {
      setIsPending(true);
      const resp = await fetch("http://localhost:3001/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed: false }),
      });
      await resp.json();
      setFormState(emptyAddToDoFormState);
      setIsPending(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setFormState({
        titleError: "Failed to add '" + title + "'.",
      });
    }
  }

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        if (title) {
          // Only add optimistic todo if title is not empty. This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
          addOptimisticTodo(title);
          formRef.current?.reset(); // Clear form immediately upon submit rather than waiting for the optimistic add to complete (at which point React would reset automatically)
        }
        addTodo(formData);
      }}
    >
      <Input
        id="title"
        label="Task"
        type="text"
        name="title"
        error={isPending ? undefined : formState.titleError}
        afterSlot={
          <Button type="submit" className="ml-2">
            Add
          </Button>
        }
      />
      <p role="alert" className="text-red-500 h-4">
        {!isPending && formState.titleError}
      </p>
    </form>
  );
}
