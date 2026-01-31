import { RootState } from "@app/store";
import { FilterType } from "./types";
import { createSelector } from "@reduxjs/toolkit";

export const selectTodoIds = (state: RootState) => state.todo.todoIDs

export const selectTodosById = (state: RootState) => state.todo.todoById

const selectFilter = (_: RootState, filter: FilterType) => filter

export const selectTodosFiltered = createSelector(
    [
        selectTodoIds,
        selectTodosById,
        selectFilter,
    ],
    (ids, byId, filter) => {
        const todos = ids.map(id => byId[id])

        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed)
            case 'completed':
                return todos.filter(todo => todo.completed)
            case 'all':
            default:
                return todos
        }
    }
)

export const makeSelectTodoById = (id: string) =>
    createSelector(
        [selectTodosById],
        (byId) => byId[id]
    )
