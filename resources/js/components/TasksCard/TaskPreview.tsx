import { MdCheck, MdEdit } from "react-icons/md";

interface TaskPreviewProps {
  title: string;
  onComplete(): void;
  onStartEditing(): void;
}

export const TaskPreview = ({ title, onComplete, onStartEditing }: TaskPreviewProps) => (
  <>
    <p className="font-mono md:text-sm mr-[calc(0.75rem+48px)]">{title}</p>
    <div
      className="flex items-center gap-2 absolute right-3 top-1/2 translate-y-[-50%] md:opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        className="border border-stone-800/30 hover:border-white/70 active:border-white text-stone-800 hover:text-white/70 active:text-white rounded-lg h-8 w-8 flex items-center justify-center transition-colors z-10"
        onClick={onStartEditing}
        title="editar tarefa"
        type="button"
      >
        <MdEdit className="text-base" />
      </button>
      <button
        className="border border-stone-800/30 hover:border-white/70 active:border-white text-stone-800 hover:text-white/70 active:text-white rounded-lg h-8 w-8 flex items-center justify-center transition-colors"
        onClick={onComplete}
        title="finalizar tarefa"
        type="button"
      >
        <MdCheck className="text-lg" />
      </button>
    </div>
  </>
);
