import { type ReactNode } from "react";

export const TasksCardHeader = ({ children }: { children: ReactNode }) => (
  <header className="bg-black/30 p-3">
    <p className="text-lg md:text-sm text-white/90 line-clamp-1 uppercase font-bold">{children}</p>
  </header>
);
