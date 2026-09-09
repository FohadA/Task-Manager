import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';

export const SortableTaskCard = ({ task, onOpen, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
    data: { title: task.titulo, status: task.estado },
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isDragging) {
      event.preventDefault();
      onOpen();
      return;
    }
    listeners?.onKeyDown?.(event);
  };

  return (
    <TaskCard
      ref={setNodeRef}
      task={task}
      onOpen={onOpen}
      onEdit={onEdit}
      onDelete={onDelete}
      dimmed={isDragging}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      {...attributes}
      {...listeners}
      onKeyDown={handleKeyDown}
    />
  );
};
