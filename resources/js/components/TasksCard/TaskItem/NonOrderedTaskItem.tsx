import { type ReactNode } from "react";
import { DefaultTaskItem } from "./DefaultTaskItem";

interface NonOrderedTaskItemProps {
  children: ReactNode;
}

export const NonOrderedTaskItem = ({ children }: NonOrderedTaskItemProps) => (
  <DefaultTaskItem>
    {children}
  </DefaultTaskItem>
);
