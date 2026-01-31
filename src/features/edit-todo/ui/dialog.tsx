'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@shared/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "@shared/ui/button";
import { CornerDownLeft } from "lucide-react";
import { useAppSelector } from "@shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { EditTodoForm, EditTodoFormHandle } from "./form";
import { selectEditTodo } from "../model/selectors";
import { openDialog, closeDialog } from "../model/slice";

export const EditTodoDialog = () => {
    const { dialogId, isOpen, todoID } = useAppSelector(selectEditTodo)

    const lastActiveElement = useRef<HTMLElement | null>(null)

    const [internalTodoId, setInternalTodoId] = useState<string | null>(null)

    useEffect(() => {
        if (todoID) setInternalTodoId(todoID)
    }, [todoID])

    useEffect(() => {
        if (isOpen) lastActiveElement.current = document.activeElement as HTMLElement
        else {
            setTimeout(() => lastActiveElement.current?.focus(), 0)
        }
    }, [isOpen])

    const dispatch = useAppDispatch()

    const formRef = useRef<EditTodoFormHandle>(null)

    const handleSubmit = () => {
        if (!formRef.current) return

        formRef.current.submit()
        closeHandler()
    }

    const openHandler = () => {
        if (todoID) dispatch(openDialog(todoID))
    }

    const closeHandler = () => {
        dispatch(closeDialog())
    }

    const openChangeHandler = (open: boolean) => {
        if (open) openHandler()
        else closeHandler()
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={openChangeHandler}
        >
            <DialogContent
                id={dialogId}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) handleSubmit()
                }}
                onAnimationEnd={event => {
                    if (event.animationName === 'exit') setInternalTodoId(null)
                }}
            >
                <DialogHeader>
                    <DialogTitle>Изменить задачу</DialogTitle>
                    <DialogDescription className='sr-only'>Изменить задачу</DialogDescription>
                </DialogHeader>
                {internalTodoId && <EditTodoForm className='min-w-0' formRef={formRef} todoID={internalTodoId}/>}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSubmit}>
                        Применить<CornerDownLeft className='size-4'/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
