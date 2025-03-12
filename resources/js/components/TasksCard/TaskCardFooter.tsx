interface TasksCardFooterProps {
  onAddNewTask(): void;
}

export const TasksCardFooter = ({ onAddNewTask }: TasksCardFooterProps) => (
  <footer className="p-3">
    <button
      className="block font-mono hover:text-black/70 active:text-black/60 mx-auto py-2 px-3 rounded-md transition-colors underline"
      onClick={onAddNewTask}
      type="button"
      title="+ adicionar tarefa"
    >
      + adicionar tarefa
    </button>
  </footer>
);
