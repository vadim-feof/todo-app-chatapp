import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './types'

export interface TodoState {
    todoById: Record<string, Todo>
    todoIDs: string[]
}

const initialState: TodoState = {
    todoById: {},
    todoIDs: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.todoById[action.payload.id] = action.payload
            state.todoIDs.unshift(action.payload.id)
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.todoById[action.payload]
            if (todo) todo.completed = !todo.completed
        },
        removeTodo(state, action: PayloadAction<string>) {
            const id = action.payload

            delete state.todoById[id]

            state.todoIDs = state.todoIDs.filter(
                todoId => todoId !== id
            )
        },
        updateTodo(state, action: PayloadAction<{ id: string, content: string }>) {
            const todo = state.todoById[action.payload.id]

            if (todo) todo.content = action.payload.content
        },
        reorderTodos(
            state,
            action: PayloadAction<{
                sourceIndex: number
                destinationIndex: number
            }>
        ) {
            const { sourceIndex, destinationIndex } = action.payload

            const [moved] = state.todoIDs.splice(sourceIndex, 1)
            state.todoIDs.splice(destinationIndex, 0, moved)
        },
    }
})

export const { addTodo, toggleTodo, removeTodo, reorderTodos, updateTodo } = todoSlice.actions
export default todoSlice.reducer
