'use client'
import { useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { DragEndEvent, } from '@dnd-kit/core';
import { Checkbox } from "@shared/ui/checkbox";
import { ButtonGroup } from "@shared/ui/button-group";
import { Button } from "@shared/ui/button";
import { Separator } from "@shared/ui/separator";
import { useAppSelector } from "@shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { Sortable, SortableHandle, SortableItem } from "@shared/ui/sortable";
import { AddTodoOpenButton } from "@features/add-todo";
import { removeTodo } from "@features/remove-todo";
import { toggleTodo } from "@features/toggle-todo";
import { reorderTodo } from "@/features/reorder-todo";
import { FilterType, Todo } from "@entities/todo";
import { selectTodoIds, selectTodosFiltered } from "@entities/todo";
import { EditTodoOpenButton } from "@features/edit-todo";
import { selectTodosInitialized } from "@features/persist-todo";
import { range } from "@shared/lib/utils/range";
import { Skeleton } from "@shared/ui/skeleton";

const emptyListMessageMap: Record<FilterType, React.ReactNode> = {
    all: (
        <>
            <div className='flex items-center gap-x-2'>
                Добавьте задачу <AddTodoOpenButton/>
            </div>
        </>
    ),
    active: 'Нет активных задач',
    completed: 'Нет выполненных задач',
}

const List = (props: React.ComponentProps<'div'>) => {
    const [filterType, setFilterType] = useState<FilterType>('all')

    const initialized = useAppSelector(selectTodosInitialized)

    const todoIds = useAppSelector(selectTodoIds)
    const todos = useAppSelector(state => selectTodosFiltered(state, filterType))

    const dispatch = useAppDispatch()

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const sourceIndex = todoIds.indexOf(active.id as string)
        const destinationIndex = todoIds.indexOf(over.id as string)

        dispatch(
            reorderTodo(
                sourceIndex,
                destinationIndex
            )
        )
    }

    const changeFilterHandler = (filter: FilterType) => {
        setFilterType(filter)
    }

    const removeTodoHandler = (id: string) => dispatch(removeTodo(id))
    const toggleTodoHandler = (id: string) => dispatch(toggleTodo(id))

    return (
        <div {...props}>
            <div>
                <ButtonGroup className='flex-wrap'>
                    <ButtonGroup>
                        <Button
                            variant={filterType === 'all' ? 'default' : 'outline'}
                            onClick={() => changeFilterHandler('all')}
                        >
                            Все
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            variant={filterType === 'active' ? 'default' : 'outline'}
                            onClick={() => changeFilterHandler('active')}
                        >
                            Активные
                        </Button>
                        <Button
                            variant={filterType === 'completed' ? 'default' : 'outline'}
                            onClick={() => changeFilterHandler('completed')}
                        >
                            Выполненные
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <AddTodoOpenButton/>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
            <Sortable items={todos} onDragEnd={handleDragEnd}>
                <Separator className='mt-5'/>
                <div className='mt-5 flex flex-col gap-y-4'>
                    {initialized ? (
                        todos.length ? (
                            todos.map(todo => (
                                <SortableItem key={todo.id} id={todo.id}>
                                    <Todo
                                        todoContent={todo.content}
                                        toggleTodoSlot={(
                                            <Checkbox
                                                checked={todo.completed}
                                                onCheckedChange={() =>
                                                    toggleTodoHandler(todo.id)
                                                }
                                            />
                                        )}
                                        removeTodoSlot={(
                                            <Button
                                                type='button'
                                                size='icon'
                                                variant='ghost'
                                                className='cursor-pointer'
                                                onClick={() => removeTodoHandler(todo.id)}
                                            >
                                                <Trash2 className='size-6'/>
                                            </Button>
                                        )}
                                        dndTodoSlot={(
                                            <SortableHandle id={todo.id} asChild>
                                                <Button
                                                    type='button'
                                                    size='icon'
                                                    variant='ghost'
                                                    className='cursor-grab data-[is-dragging]:cursor-grabbing'
                                                >
                                                    <GripVertical className='size-6'/>
                                                </Button>
                                            </SortableHandle>
                                        )}
                                        editTodoSlot={(
                                            <EditTodoOpenButton todoID={todo.id}/>
                                        )}
                                    />
                                </SortableItem>
                            ))
                        ) : (
                            <div>
                                {emptyListMessageMap[filterType]}
                            </div>
                        )
                    ) : (
                        range(3).map(number => (
                            <Skeleton key={number} className='h-16'/>
                        ))
                    )}
                </div>
            </Sortable>
        </div>
    );
};

export default List;
