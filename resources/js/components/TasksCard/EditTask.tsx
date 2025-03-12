import { type FocusEventHandler, type KeyboardEventHandler } from 'react';

interface EditTaskProps {
  defaultValue: string;
  onEdit(title: string): void;
}

export const EditTask = ({ defaultValue, onEdit }: EditTaskProps) => {
  const onBlur: FocusEventHandler<HTMLInputElement> = event => {
    onEdit(event.target.value);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') onEdit(event.currentTarget.value);

    if (event.key === 'Escape') onEdit('');
  };

  return (
    <input
      autoFocus
      className="bg-transparent font-mono outline-none placeholder:text-white/60 text-white/90 md:text-sm w-full"
      defaultValue={defaultValue}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder="enter the task title"
      type="text"
    />
  );
};
