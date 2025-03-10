import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

import { DefaultTaskItem } from "./DefaultTaskItem";

interface OrderedTaskItemProps {
  id: number;
  children: ReactNode;
}

export const OrderedTaskItem = ({ id, children }: OrderedTaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <DefaultTaskItem
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
      }}
    >
      {children}
    </DefaultTaskItem>
  );
};
