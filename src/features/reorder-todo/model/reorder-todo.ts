import { reorderTodos } from '@/entities/todo'

export const reorderTodo = (
    sourceIndex: number,
    destinationIndex: number
) =>
    reorderTodos({ sourceIndex, destinationIndex })
