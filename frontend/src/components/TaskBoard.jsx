import { useMemo, useRef, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { relocateTask } from '../lib/relocateTask';
import { BOARD_COLUMNS, isColumnId } from './boardColumns';
import { BoardColumn } from './BoardColumn';
import { TaskCard } from './TaskCard';

export const TaskBoard = ({ tasks, setTasks, onStatusChange, onOpen, onEdit, onDelete }) => {
  const [activeTask, setActiveTask] = useState(null);
  const originStatus = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      keyboardCodes: { start: ['Space'], cancel: ['Escape'], end: ['Space', 'Enter'] },
    })
  );

  const tasksByColumn = useMemo(
    () =>
      BOARD_COLUMNS.reduce(
        (acc, column) => ({
          ...acc,
          [column.status]: tasks.filter((t) => t.estado === column.status),
        }),
        {}
      ),
    [tasks]
  );

  const columnOf = (id) => (isColumnId(id) ? id : tasks.find((t) => t._id === id)?.estado);

  const handleDragStart = ({ active }) => {
    const task = tasks.find((t) => t._id === active.id);
    originStatus.current = task?.estado ?? null;
    setActiveTask(task ?? null);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    const from = columnOf(active.id);
    const to = columnOf(over.id);
    if (!from || !to || from === to) return;
    setTasks((prev) => relocateTask(prev, active.id, over.id, to));
  };

  const handleDragEnd = ({ active, over }) => {
    const origin = originStatus.current;
    originStatus.current = null;
    setActiveTask(null);
    if (!over) return;

    const to = columnOf(over.id);
    if (!to) return;

    if (active.id !== over.id) {
      setTasks((prev) => relocateTask(prev, active.id, over.id, to));
    }

    if (origin && origin !== to) {
      onStatusChange(active.id, to, origin);
    }
  };

  const handleDragCancel = ({ active }) => {
    const origin = originStatus.current;
    originStatus.current = null;
    setActiveTask(null);
    if (origin) setTasks((prev) => relocateTask(prev, active.id, null, origin));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      accessibility={{
        screenReaderInstructions: {
          draggable:
            'Pulsa Espacio para agarrar la tarea. Usa las flechas para llevarla a otra columna y Espacio otra vez para soltarla. Escape cancela.',
        },
        announcements: {
          onDragStart: ({ active }) => `Has agarrado la tarea ${active.data.current?.title}.`,
          onDragOver: ({ active, over }) =>
            over
              ? `${active.data.current?.title} está sobre ${
                  BOARD_COLUMNS.find((c) => c.status === over.id)?.label ||
                  over.data.current?.title
                }.`
              : undefined,
          onDragEnd: ({ active, over }) =>
            over
              ? `${active.data.current?.title} se ha soltado.`
              : `${active.data.current?.title} vuelve a su sitio.`,
          onDragCancel: ({ active }) =>
            `Movimiento cancelado. ${active.data.current?.title} vuelve a su columna.`,
        },
      }}
    >
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
        {BOARD_COLUMNS.map((column) => (
          <BoardColumn
            key={column.status}
            column={column}
            tasks={tasksByColumn[column.status]}
            dragging={Boolean(activeTask)}
            onOpen={onOpen}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.2, 0, 0, 1)' }}>
        {activeTask ? <TaskCard task={activeTask} floating /> : null}
      </DragOverlay>
    </DndContext>
  );
};
