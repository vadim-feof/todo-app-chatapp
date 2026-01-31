import { removeTodo as removeTodoAction } from "@entities/todo";

export const removeTodo = (id: string) => removeTodoAction(id)
