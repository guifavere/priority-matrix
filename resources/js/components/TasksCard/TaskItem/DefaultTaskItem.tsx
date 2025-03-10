import { cn } from "@/utils/cn";
import { type ReactNode, type HTMLProps, forwardRef } from "react";

interface DefaultTaskItemProps extends HTMLProps<HTMLLIElement> {
  children: ReactNode;
};


export const DefaultTaskItem = forwardRef<HTMLLIElement, DefaultTaskItemProps>(({ children, ...props }, ref) => (
  <li
    {...props}
    className={cn('py-3.5 px-3.5 rounded-md bg-black/20 focus-within:bg-black/40 transition-colors relative group', props.className)}
    ref={ref}
  >
    {children}
  </li>
));
