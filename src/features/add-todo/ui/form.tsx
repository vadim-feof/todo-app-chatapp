'use client'
import { Textarea } from "@shared/ui/textarea";
import { Ref, useId, useImperativeHandle, useState } from "react";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { createTodo } from "../model/add-todo";

export interface AddTodoFormHandle {
    submit: () => void
}

interface AddTodoFormProps {
    formRef?: Ref<AddTodoFormHandle>
}

export const AddTodoForm = ({ formRef, ...props }: React.ComponentProps<'div'> & AddTodoFormProps) => {
    const [inputValue, setInputValue] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleChangeContent = (value: string) => {
        setInputValue(value)
    }

    const clearInputValue = () => {
        setInputValue('')
    }

    const onSubmit = () => {
        if (inputValue.trim()) {
            dispatch(createTodo(inputValue))
            clearInputValue()
        }
    }

    useImperativeHandle(formRef, () => ({
        submit: onSubmit
    }))

    const id = useId()

    return (
        <div {...props}>
            <Textarea
                id={`add-todo-content-${id}`}
                value={inputValue}
                onChange={e => handleChangeContent(e.currentTarget.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) event.preventDefault()
                }}
            />
        </div>
    )
}
