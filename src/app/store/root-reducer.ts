import { combineReducers } from '@reduxjs/toolkit'
import { todoReducer } from '@/entities/todo'
import { addTodoReducer } from '@/features/add-todo'
import { editTodoSlice } from '@/features/edit-todo'
import { persistTodoSlice } from "@/features/persist-todo";

export const rootReducer = combineReducers({
    todo: todoReducer,
    addTodo: addTodoReducer,
    editTodo: editTodoSlice,
    persistTodo: persistTodoSlice,
})
