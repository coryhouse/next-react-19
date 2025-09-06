import { Todo } from "./todo.types";

export type TodoAction =
  | {
      type: "ADD_TODO";
      task: string;
    }
  | {
      type: "EDIT_TODO";
      id: string;
      task: string;
    }
  | {
      type: "TOGGLE_TODO";
      id: string;
    }
  | {
      type: "DELETE_TODO";
      id: string;
    };

export function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          task: action.task,
          done: false,
          status: "unsaved",
        },
      ];

    case "EDIT_TODO":
      return state.map((todo) =>
        "id" in todo && todo.id === action.id
          ? {
              ...todo,
              task: action.task,
            }
          : todo
      );

    case "TOGGLE_TODO":
      return state.map((todo) =>
        "id" in todo && todo.id === action.id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => {
        return "id" in todo && todo.id !== action.id;
      });

    default:
      throw new Error("Invalid action type");
  }
}
