import { toggleTodo as toggleTodoAction } from "@entities/todo";

export const toggleTodo = (id: string) => toggleTodoAction(id)
