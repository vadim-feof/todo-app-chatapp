import { updateTodo } from "@entities/todo";

export const editTodo = (id: string, content: string) =>
    updateTodo({
        id, content,
    })
