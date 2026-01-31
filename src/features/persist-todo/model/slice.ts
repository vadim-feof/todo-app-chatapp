import { createSlice } from "@reduxjs/toolkit";

export interface PersistTodoState {
    initialized: boolean
}

const initialState: PersistTodoState = {
    initialized: false
}

const persistTodoSlice = createSlice({
    name: 'persistTodo',
    initialState,
    reducers: {
        init: (state) => {
            state.initialized = true
        }
    }
})

export const { init } = persistTodoSlice.actions
export default persistTodoSlice.reducer
