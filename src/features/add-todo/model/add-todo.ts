import { nanoid } from '@reduxjs/toolkit'
import { addTodo } from "@entities/todo";

export const createTodo = (content: string) =>
    addTodo({
        id: nanoid(),
        content,
        completed: false,
    })
