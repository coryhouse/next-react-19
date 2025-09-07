"use client";
import Input from "@/components/Input";
import clsx from "clsx";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import LoadingIndicator from "@/components/LoadingIndicator";
import { toast } from "sonner";
import { type SavedTodo } from "./todo.types";

export type EditTodoFormState =
  | {
      status: "idle";
    }
  | {
      status: "success";
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

type EditTodoFormProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  todo: SavedTodo;
  setOptimistic: (todo: SavedTodo) => void;
};

const baseUrl = "http://localhost:3001/todos/";

const readOnlyInputStyles = "border-white bg-transparent";

export function EditTodoForm({
  isEditing,
  setIsEditing,
  todo,
  setOptimistic,
}: EditTodoFormProps) {
  const [formState, setFormState] = useState(emptyEditTodoFormState);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const task = formData.get("task")?.valueOf();
    setIsPending(true);
    if (!task || typeof task !== "string")
      return { errors: { task: "Task is required" }, status: "error" };

    setOptimistic({
      ...todo,
      task,
    });
    toast.success("Todo saved.");

    try {
      const resp = await fetch(baseUrl + todo.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });
      if (!resp.ok) throw resp;
      setFormState({
        status: "success",
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Edit failed.");
      setFormState({
        ...formState,
        status: "error",
        errors: {
          task: "An error occurred. Please try again.",
        },
      });
      // Rollback optimistic set above since an error occurred
      setOptimistic(todo);
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  if (todo.done) {
    return (
      <Input
        disabled
        defaultValue={todo.task}
        className={clsx(readOnlyInputStyles, "line-through")}
      />
    );
  }

  return isEditing ? (
    <form onSubmit={handleSubmit} className="flex flex-row items-center grow-0">
      <Input
        autofocusOnFirstRender
        name="task"
        defaultValue={todo.task}
        error={formState.status === "error" ? formState.errors.task : undefined}
      />
      <div className="ml-2">
        <Button type="submit">{isPending ? "Saving..." : "Save"}</Button>
        <Button variant="text" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
      {isPending && <LoadingIndicator />}
    </form>
  ) : (
    <Input
      defaultValue={todo.task}
      onFocus={() => setIsEditing(true)}
      className={readOnlyInputStyles}
    />
  );
}
