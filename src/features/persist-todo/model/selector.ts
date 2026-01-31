import { RootState } from "@app/store";

export const selectTodosInitialized = (state: RootState) => state.persistTodo.initialized
