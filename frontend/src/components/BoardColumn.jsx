import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskCard } from './SortableTaskCard';

export const BoardColumn = ({ column, tasks, dragging, onOpen, onEdit, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.status });
  const ids = tasks.map((t) => t._id);

  return (
    <section
      aria-label={`${column.label}, ${tasks.length} ${tasks.length === 1 ? 'tarea' : 'tareas'}`}
      className={`flex min-h-32 flex-col rounded-card border bg-canvas sm:min-h-50 transition-colors duration-150 ${
        isOver
          ? 'border-brand bg-brand-50'
          : dragging
            ? 'border-dashed border-line'
            : 'border-line'
      }`}
    >
      <header className="flex items-center gap-2 rounded-t-card border-b border-line bg-surface px-4 py-3">
        <span className={`h-2 w-2 shrink-0 rounded-full ${column.dot}`} />
        <h3 className="text-[15px] font-semibold text-ink">{column.label}</h3>
        <span className="ml-auto font-mono text-[13px] text-ink-400 tabular">{tasks.length}</span>
      </header>

      <div ref={setNodeRef} className="flex flex-1 flex-col gap-2 p-2">
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard
              key={task._id}
              task={task}
              onOpen={() => onOpen(task)}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task._id)}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <p
            className={`flex flex-1 items-center justify-center rounded-field px-3 py-6 text-center text-[12.5px] ${
              isOver ? 'border border-dashed border-brand text-brand-700' : 'text-ink-400'
            }`}
          >
            {dragging ? `Soltar en ${column.label.toLowerCase()}` : 'Sin tareas'}
          </p>
        )}
      </div>
    </section>
  );
};
