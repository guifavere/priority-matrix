import { type Task } from '@/features/tasks';
import { EditTask } from './EditTask';
import { NewTask } from './NewTask';
import { OrderedTaskItem, NonOrderedTaskItem } from './TaskItem';
import { TaskPreview } from './TaskPreview';
import { SortableContext } from '@dnd-kit/sortable';

interface TasksCardContentProps {
  onCompleteTask(id: number): () => void;
  onSaveNewTask(title: string): void;
  onStartEditingTask(id: number): () => void;
  onEditTask(id: number): (title: string) => void;
  editingTask: null | number;
  showNewTask: boolean;
  tasks: Task[];
}

export const TasksCardContent = ({
  onCompleteTask,
  onSaveNewTask,
  onStartEditingTask,
  onEditTask,
  editingTask,
  showNewTask,
  tasks,
}: TasksCardContentProps) => {
  const isDisabled = showNewTask || tasks.length === 1;

  return (
    <SortableContext items={tasks} disabled={isDisabled}>
      <ul className="grow p-3 text-sm space-y-2">
        {tasks.map(task => (
          <OrderedTaskItem key={task.id} id={task.id}>
            {editingTask === task.id ? (
              <EditTask
                defaultValue={task.title}
                onEdit={onEditTask(task.id)}
              />
            ) : (
              <TaskPreview
                onComplete={onCompleteTask(task.id)}
                onStartEditing={onStartEditingTask(task.id)}
                title={task.title}
              />
            )}
          </OrderedTaskItem>
        ))}
        {showNewTask && (
          <NonOrderedTaskItem>
            <NewTask onSave={onSaveNewTask} />
          </NonOrderedTaskItem>
        )}
      </ul>
    </SortableContext>
  );
};
