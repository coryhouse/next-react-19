"use client";
import { emptyAddToDoFormState, Todo } from "@/types/todo";
import { SubmitButton } from "../components/SubmitButton";
import { addTodo, deleteTodo } from "./actions";
import { useOptimistic, useRef } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/Button";
import Input from "@/components/Input";

type TodosProps = {
  todos: Todo[];
};

export function Todos({ todos }: TodosProps) {
  // Next.js docs still reference useFormState
  // On RSC apps, makes forms interactive before JavaScript has executed on the client.
  // When used without Server Components, is equivalent to component local state.
  const [state, formAction] = useFormState(addTodo, emptyAddToDoFormState);
  const addTodoFormRef = useRef<HTMLFormElement>(null);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => [
      ...state,
      {
        completed: false,
        id: state.length + 1,
        title: newTodo,
        saving: true, // bool that tracks if the todo is currently in the process of saving
      },
    ]
  );

  return (
    <>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="flex">
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <SubmitButton label="Delete" loadingLabel="Deleting..." />
            </form>
            {todo.title}
            {todo.saving && (
              <span className="text-sm text-slate-400 ml-2">Saving...</span>
            )}
          </li>
        ))}
      </ul>
      <form
        ref={addTodoFormRef}
        action={(payload) => {
          addOptimisticTodo(payload.get("title") as string);
          addTodoFormRef.current?.reset(); // Clear form upon submit
          formAction(payload);
        }}
        className="mt-4"
      >
        <Input
          id="title"
          label="What do you need to do?"
          type="text"
          name="title"
          className={`${
            state.titleError ? "border-red-500" : "border-gray-500"
          } border p-1`}
        />
        <Button className="ml-2">Add</Button>
        {state?.titleError && (
          <p role="alert" className="text-red-500">
            {state?.titleError}
          </p>
        )}
      </form>
    </>
  );
}
