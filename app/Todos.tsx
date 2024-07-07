"use client";
import { emptyAddToDoFormState, Todo } from "@/types/todo";
import { SubmitButton } from "../components/SubmitButton";
import { addTodo, deleteTodo } from "./actions";
import { useOptimistic, useRef } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import DeleteButton from "@/components/DeleteButton";

type TodosProps = {
  todos: Todo[];
};

export function Todos({ todos }: TodosProps) {
  // Next.js docs still reference useFormState
  // On RSC apps, makes forms interactive before JavaScript has executed on the client.
  // When used without Server Components, is equivalent to component local state.
  const [addTodoFormState, validateAddTodoAction] = useFormState(
    validateAddTodo,
    emptyAddToDoFormState
  );
  const addTodoFormRef = useRef<HTMLFormElement>(null);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => [
      ...state,
      {
        completed: false,
        id: state.length + 1, // TODO: Improve.
        title: newTodo,
        saving: true, // bool that tracks if the todo is currently in the process of saving
      },
    ]
  );

  return (
    <>
      <form
        ref={addTodoFormRef}
        action={(payload) => {
          const title = payload.get("title") as string;
          if (title) {
            // Only add optimistic todo if title is not empty.
            // This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
            addOptimisticTodo(title);
          addTodoFormRef.current?.reset(); // Clear form upon submit
          }
          formAction(payload);
        }}
        className="mt-4"
      >
        <div className="flex grow-0 items-center">
        <Input
          id="title"
          label="What do you need to do?"
          type="text"
          name="title"
            error={addTodoFormState.titleError}
        />
        <Button className="ml-2">Add</Button>
        </div>
      </form>
      <ul className="mt-2">
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="flex items-center">
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <DeleteButton />
            </form>
            <form ref={toggleFormRef} action={toggleComplete}>
              <input
                onChange={toggleFormRef.current?.submit}
                type="checkbox"
                name="id"
                value={todo.id}
              />
            </form>
            <span className="ml-2">{todo.title}</span>
            {todo.saving && (
              <span className="text-sm text-slate-400 ml-2">Saving...</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
