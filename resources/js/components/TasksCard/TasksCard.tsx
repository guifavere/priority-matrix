import { cn } from '@/utils/cn';
import { type ReactNode } from 'react';

interface TasksCardProps {
  className?: string;
  children: ReactNode;
}

export const TasksCard = ({ className, children }: TasksCardProps) => (
  <div
    className={cn(
      className,
      'flex flex-col justify-between border-4 border-black/30 shadow-xl rounded-xl overflow-hidden',
    )}
  >
    {children}
  </div>
);
