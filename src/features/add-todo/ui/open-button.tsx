'use client'
import { Button } from "@shared/ui/button";
import { Plus } from "lucide-react";
import { useAppSelector } from "@shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { openDialog } from "../model/slice";
import { selectAddTodo } from "../model/selectors";
import { cn } from "@shared/lib/utils/cn";

interface OpenButtonProps {
}

export const AddTodoOpenButton = ({
    className,
    ...props
}: React.ComponentProps<typeof Button> & OpenButtonProps) => {

    const { isOpen, dialogId } = useAppSelector(selectAddTodo)

    const dispatch = useAppDispatch()

    const handleOpen = () =>
        dispatch(openDialog())

    return (
        <Button
            className={cn(
                'cursor-pointer',
                className
            )}
            type='button'
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={dialogId}
            onClick={handleOpen}
            {...props}
        >
            <Plus className='size-4'/>
            Добавить
        </Button>
    )
}
