'use client'
import { Textarea } from "@shared/ui/textarea";
import { Ref, useId, useImperativeHandle, useMemo, useState } from "react";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { editTodo } from "../model/edit-todo";
import { useAppSelector } from "@shared/lib/hooks/use-app-selector";
import { makeSelectTodoById } from "@entities/todo";

export interface EditTodoFormHandle {
    submit: () => void
}

interface EditTodoFormProps {
    formRef?: Ref<EditTodoFormHandle>,
    todoID: string,
}

export const EditTodoForm = ({ formRef, todoID, ...props }: React.ComponentProps<'div'> & EditTodoFormProps) => {
    const selectTodoById = useMemo(() => makeSelectTodoById(todoID), [todoID])
    const todo = useAppSelector(selectTodoById)

    const [inputValue, setInputValue] = useState<string>(todo?.content || '')
    const dispatch = useAppDispatch()

    const handleChangeContent = (value: string) => {
        setInputValue(value)
    }

    const onSubmit = () => {
        if (todoID && inputValue.trim()) dispatch(editTodo(todoID, inputValue))
    }

    useImperativeHandle(formRef, () => ({
        submit: onSubmit
    }))

    const id = useId()

    return (
        <div {...props}>
            <Textarea
                id={`edit-todo-content-${id}`}
                value={inputValue}
                onChange={e => handleChangeContent(e.currentTarget.value)}
                onFocus={(event) => {
                    event.currentTarget.selectionStart = event.currentTarget.selectionStart = todo.content.length
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) event.preventDefault()
                }}
            />
        </div>
    )
}
