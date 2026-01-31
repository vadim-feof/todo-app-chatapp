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
import { useEffect, useRef } from "react";
import { Button } from "@shared/ui/button";
import { CornerDownLeft } from "lucide-react";
import { useAppSelector } from "@shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { AddTodoForm, AddTodoFormHandle } from "./form";
import { selectAddTodo } from "../model/selectors";
import { openDialog, closeDialog } from "../model/slice";

interface AddTodoDialogProps {
}

export const AddTodoDialog = ({}: AddTodoDialogProps) => {

    const { dialogId, isOpen } = useAppSelector(selectAddTodo)

    const lastActiveElement = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (isOpen) lastActiveElement.current = document.activeElement as HTMLElement
        else {
            setTimeout(() => lastActiveElement.current?.focus(), 0)
        }
    }, [isOpen])

    const dispatch = useAppDispatch()

    const formRef = useRef<AddTodoFormHandle>(null)

    const handleSubmit = () => {
        if (!formRef.current) return

        formRef.current.submit()
        closeHandler()
    }

    const openHandler = () => {
        dispatch(openDialog())
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
            >
                <DialogHeader>
                    <DialogTitle>Добавить задачу</DialogTitle>
                    <DialogDescription className='sr-only'>Добавить задачу</DialogDescription>
                </DialogHeader>
                <AddTodoForm className='min-w-0' formRef={formRef}/>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSubmit}>Добавить<CornerDownLeft className='size-4'/></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
