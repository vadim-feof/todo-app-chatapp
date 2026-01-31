'use client'
import { Pencil } from "lucide-react";
import { Button } from "@shared/ui/button";
import { useAppSelector } from "@shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { openDialog } from "../model/slice";
import { selectEditTodo } from "../model/selectors";

interface OpenButtonProps {
    todoID: string
}

export const EditTodoOpenButton = ({
    todoID,
    ...props
}: React.ComponentProps<typeof Button> & OpenButtonProps) => {

    const { isOpen, dialogId } = useAppSelector(selectEditTodo)

    const dispatch = useAppDispatch()

    const handleOpen = () =>
        dispatch(openDialog(todoID))

    return (
        <Button
            className='cursor-pointer'
            type='button'
            size='icon'
            variant='ghost'
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={dialogId}
            onClick={handleOpen}
            {...props}
        >
            <Pencil className='size-5'/>
        </Button>
    )
}
