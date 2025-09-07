"use client";
import DeleteButton from "@/components/DeleteButton";
import { Todo as TodoType, type SavedTodo } from "./todo.types";
import { useState } from "react";
import clsx from "clsx";
import { EditTodoForm } from "./edit-todo-form";
import { toast } from "sonner";
import LoadingIndicator from "@/components/LoadingIndicator";

type TodoProps = {
  todo: TodoType;
  setTodo: (todo: SavedTodo) => void;
};

const baseUrl = "http://localhost:3001/todos/";

export function Todo({ todo, setTodo }: TodoProps) {
  const [optimisticDone, setOptimisticDone] = useState(todo.done);
  const [isEditing, setIsEditing] = useState(false);
  const [isTogglePending, setIsTogglePending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const isPending = isTogglePending || isDeletePending || !("id" in todo);

  return (
    <li
      className={clsx("flex flex-row items-center pt-1 pb-1", {
        "opacity-30": isPending,
        "pointer-events-none": isPending,
      })}
    >
      {/* Must useTransition instead of a form here so we can "see" the delete is in progress above. We would need a form tag for each todo, but the form would have to be above the ul for us to read the form's status via useFormStatus. And the <form> can't be a child of <ul>, because that's invalid HTML. Thus, useTransition is our only option here. */}
      <DeleteButton
        aria-label={`Delete ${todo.task}`}
        onClick={async () => {
          if (!("id" in todo)) return; // just here to narrow type. Shouldn't be possible to click delete on an unsaved todo anyway.
          setIsEditing(false);
          toast.success("Todo deleted");
          // Optimistically mark deleted
          setTodo({ ...todo });
          setIsDeletePending(true);
          try {
            await fetch(baseUrl + todo.id, {
              method: "DELETE",
            });
            // revalidateTag("todos");
          } catch (error) {
            // Revert the optimistic set above
            setOptimisticDone(todo.done);
            toast.error("Delete failed.");
            setIsEditing(true);
          } finally {
            setIsDeletePending(false);
          }
        }}
      />
      <>
        <input
          className="mr-2"
          disabled={isPending}
          checked={optimisticDone}
          onChange={async () => {
            toast.success("Todo toggled");
            setIsTogglePending(true);
            setIsEditing(false);
            try {
              if (!("id" in todo)) return; // merely here to narrow type. Can't get here if isPending is true.
              const resp = await fetch(baseUrl + todo.id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ done: todo.done }),
              });
              if (!resp.ok) {
                throw new Error("Failed to toggle");
              }
            } catch (error) {
              // Revert the toggle
              setOptimisticDone(todo.done);
              toast.error("Toggle failed.");
              console.error(error);
            } finally {
              setIsTogglePending(false);
            }
          }}
          type="checkbox"
          name="id"
          value={"id" in todo ? todo.id : ""}
        />

        {"id" in todo ? (
          <EditTodoForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setOptimistic={(todo) => {
              setTodo(todo);
            }}
            todo={todo}
          />
        ) : (
          <span>{todo.task}</span>
        )}
      </>

      {isPending && <LoadingIndicator />}
    </li>
  );
}
