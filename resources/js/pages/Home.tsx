import { router } from "@inertiajs/react";
import { useState } from "react";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { type Task } from '@/features/tasks';
import { TasksCardHeader, TasksCardFooter, TasksCardContent, TasksCard } from "@/components/TasksCard";
import { arrayMove } from "@dnd-kit/sortable";

enum Priority {
  ImportantUrgent = 0,
  ImportantNotUrgent = 1,
  NotImportantUrgent = 2,
  NotImportantNotUrgent = 3,
}

interface HomeProps {
  tasks: Task[];
};

const initialTasks: {
  importantUrgentTasks: Task[],
  importantNotUrgentTasks: Task[],
  notImportantUrgentTasks: Task[],
  notImportantNotUrgentTasks: Task[],
} = {
  importantUrgentTasks: [],
  importantNotUrgentTasks: [],
  notImportantUrgentTasks: [],
  notImportantNotUrgentTasks: [],
};

const groupByPriority = (acc: typeof initialTasks, task: Task) => {
  switch (task.priority) {
    case Priority.ImportantUrgent:
      acc = {
        ...acc,
        importantUrgentTasks: [...acc.importantUrgentTasks, task],
      }

      break;
    case Priority.ImportantNotUrgent:
      acc = {
        ...acc,
        importantNotUrgentTasks: [...acc.importantNotUrgentTasks, task],
      }

      break;
    case Priority.NotImportantUrgent:
      acc = {
        ...acc,
        notImportantUrgentTasks: [...acc.notImportantUrgentTasks, task],
      }

      break;
    case Priority.NotImportantNotUrgent:
      acc = {
        ...acc,
        notImportantNotUrgentTasks: [...acc.notImportantNotUrgentTasks, task],
      }

      break;
    default:
      throw new Error('Invalid priority');
  }

  return acc;
};

export default function Home({ tasks }: HomeProps) {
  const [orderedTasks, setOrderedTasks] = useState<Task[]>(tasks);

  const {
    importantUrgentTasks,
    importantNotUrgentTasks,
    notImportantUrgentTasks,
    notImportantNotUrgentTasks,
  } = orderedTasks.reduce(groupByPriority, initialTasks);

  const [showNewTask, setShowNewTask] = useState<null | Priority>(null);

  const [editingTask, setEditingTask] = useState<null | number>(null);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 5 }
  }));

  const onShowNewTask = (priority: Priority) => () => setShowNewTask(priority);

  const onSaveNewTask = (title: string) => {
    if (!!title === true) {
      router.post('/tasks', { title, priority: showNewTask }, { preserveState: false, preserveScroll: true });
    } else {
      setShowNewTask(null);
    }
  };

  const onStartEditingTask = (id: number) => () => setEditingTask(id);

  const onEditTask = (id: number) => (title: string) => {
    if (!!title === true) {
      router.put('/tasks', { tasks: [{ id, title }] }, { preserveState: false, preserveScroll: true });
    } else {
      setEditingTask(null);
    }
  };

  const onCompleteTask = (id: number) => () =>
    router.patch(`/tasks/${id}/complete`, {}, { preserveState: false, preserveScroll: true });

  const reorderTasks = (event: DragEndEvent) => {
    if (!event.over) return;

    if (event.active.id !== event.over.id) {
      const oldIndex = orderedTasks.findIndex(task => task.id === event.active.id);
      const newIndex = orderedTasks.findIndex(task => task.id === event.over!.id);

      const updatedOrderedTasks = arrayMove(orderedTasks, oldIndex, newIndex);

      setOrderedTasks(updatedOrderedTasks);

      router.put(
        '/tasks',
        { tasks: updatedOrderedTasks.map(({ id }, index) => ({ id, order: index })) },
        { preserveState: false, preserveScroll: true },
      );
    }
  };

  return (
    <DndContext onDragEnd={reorderTasks} sensors={sensors}>
      <main className="grid md:grid-cols-2 min-h-dvh w-screen p-4 gap-4">
        <TasksCard className="bg-[#ff8383]">
          <TasksCardHeader>Importante e urgente</TasksCardHeader>
          <TasksCardContent
            onCompleteTask={onCompleteTask}
            onSaveNewTask={onSaveNewTask}
            onStartEditingTask={onStartEditingTask}
            onEditTask={onEditTask}
            editingTask={editingTask}
            showNewTask={showNewTask === Priority.ImportantUrgent}
            tasks={importantUrgentTasks}
          />
          <TasksCardFooter onAddNewTask={onShowNewTask(Priority.ImportantUrgent)} />
        </TasksCard>
        <TasksCard className="bg-[#fff574]">
          <TasksCardHeader>Importante mas não urgente</TasksCardHeader>
          <TasksCardContent
            onCompleteTask={onCompleteTask}
            onSaveNewTask={onSaveNewTask}
            onStartEditingTask={onStartEditingTask}
            onEditTask={onEditTask}
            editingTask={editingTask}
            showNewTask={showNewTask === Priority.ImportantNotUrgent}
            tasks={importantNotUrgentTasks}
          />
          <TasksCardFooter onAddNewTask={onShowNewTask(Priority.ImportantNotUrgent)} />
        </TasksCard>
        <TasksCard className="bg-[#a1d6cb]">
          <TasksCardHeader>Urgente mas não importante</TasksCardHeader>
          <TasksCardContent
            onCompleteTask={onCompleteTask}
            onSaveNewTask={onSaveNewTask}
            onStartEditingTask={onStartEditingTask}
            onEditTask={onEditTask}
            editingTask={editingTask}
            showNewTask={showNewTask === Priority.NotImportantUrgent}
            tasks={notImportantUrgentTasks}
          />
          <TasksCardFooter onAddNewTask={onShowNewTask(Priority.NotImportantUrgent)} />
        </TasksCard>
        <TasksCard className="bg-[#a19ad3]">
          <TasksCardHeader>não urgente e não importante</TasksCardHeader>
          <TasksCardContent
            onCompleteTask={onCompleteTask}
            onSaveNewTask={onSaveNewTask}
            onStartEditingTask={onStartEditingTask}
            onEditTask={onEditTask}
            editingTask={editingTask}
            showNewTask={showNewTask === Priority.NotImportantNotUrgent}
            tasks={notImportantNotUrgentTasks}
          />
          <TasksCardFooter onAddNewTask={onShowNewTask(Priority.NotImportantNotUrgent)} />
        </TasksCard>
      </main>
    </DndContext>
  );
};
