import { createSlice } from "@reduxjs/toolkit";

interface AddTodoState {
    isOpen: boolean
    dialogId: string,
}

const initialState: AddTodoState = {
    isOpen: false,
    dialogId: 'add-todo-dialog',
}

const addTodoSlice = createSlice({
    name: 'addTodo',
    initialState,
    reducers: {
        openDialog: (state) => {
            state.isOpen = true
        },
        closeDialog: (state) => {
            state.isOpen = false
        },
    }
})

export const { openDialog, closeDialog } = addTodoSlice.actions
export default addTodoSlice.reducer
