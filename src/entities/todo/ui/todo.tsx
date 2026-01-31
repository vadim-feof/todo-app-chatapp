import { Card, CardContent } from "@shared/ui/card";
import { cn } from "@shared/lib/utils/cn";

interface TodoProps {
    todoContent: React.ReactNode,
    removeTodoSlot?: React.ReactNode
    dndTodoSlot?: React.ReactNode
    toggleTodoSlot?: React.ReactNode
    editTodoSlot?: React.ReactNode
}

export const Todo = ({
    className,
    todoContent,
    removeTodoSlot,
    dndTodoSlot,
    toggleTodoSlot,
    editTodoSlot,
    ...props
}: TodoProps & React.ComponentProps<'div'>) => {

    return (
        <Card className={cn('relative', className)} {...props}>
            <CardContent className='flex gap-x-3'>
                <div className='flex items-center gap-x-2 self-start shrink-0'>
                    {dndTodoSlot}
                    {toggleTodoSlot}
                    {editTodoSlot}
                </div>
                <div className='pr-10 text-ellipsis overflow-hidden'>
                    {todoContent}
                </div>
                <div
                    className='absolute right-4 top-4'
                >
                    {removeTodoSlot}
                </div>
            </CardContent>
        </Card>
    )
}
