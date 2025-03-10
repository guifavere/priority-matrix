import { FocusEventHandler, KeyboardEventHandler } from "react";

interface NewTaskProps {
  onSave(title: string): void;
}

export const NewTask = ({ onSave }: NewTaskProps) => {
  const onBlur: FocusEventHandler<HTMLInputElement> = event => onSave(event.target.value);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') onSave(event.currentTarget.value);

    if (event.key === 'Escape') onSave('');
  };

  return (
    <input
      autoFocus
      className="bg-transparent font-mono outline-none placeholder:text-white/60 text-white/90 md:text-sm w-full"
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder="Informe o título da tarefa"
      type="text"
    />
  );
}
