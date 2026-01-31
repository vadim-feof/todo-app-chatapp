import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditTodoState {
    isOpen: boolean
    todoID: string | null,
    dialogId: string,
}

const initialState: EditTodoState = {
    isOpen: false,
    todoID: null,
    dialogId: 'edit-todo-dialog',
}

const editTodoSlice = createSlice({
    name: 'editTodo',
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.todoID = action.payload
        },
        closeDialog: (state) => {
            state.isOpen = false
            state.todoID = null
        },
    }
})

export const { openDialog, closeDialog } = editTodoSlice.actions
export default editTodoSlice.reducer
