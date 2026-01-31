'use client'
import { Slot } from "radix-ui";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, DragEndEvent,
} from '@dnd-kit/core';

import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@shared/lib/utils/cn";

interface SortableProps {
    onDragEnd?: (event: DragEndEvent) => void
}

export const Sortable = ({
    children,
    items,
    onDragEnd
}: SortableProps & React.ComponentProps<typeof SortableContext>) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(PointerSensor)
    )

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    )
}

export const SortableItem = ({
    className, asChild, ...props
}: React.ComponentProps<'div'> & { id: string } & { asChild?: boolean }) => {
    const {
        attributes,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none'
    }

    const Comp = asChild ? Slot.Root : 'div'

    return (
        <Comp className={cn('data-[is-dragging]:z-10', className)} ref={setNodeRef} style={style} data-is-dragging={isDragging ? '' : undefined} {...attributes} {...props} />
    )
}

export const SortableHandle = ({
    className, asChild, ...props
}: React.ComponentProps<'button'> & { id: string } & {
    asChild?: boolean
}) => {
    const {
        listeners,
        setActivatorNodeRef,
        isDragging,
    } = useSortable({ id: props.id })

    const Comp = asChild ? Slot.Root : 'button'

    return (
        <Comp ref={setActivatorNodeRef} data-is-dragging={isDragging ? '' : undefined} {...listeners} {...props}/>
    )
}
