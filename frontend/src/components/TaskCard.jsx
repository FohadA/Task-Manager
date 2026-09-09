import { Trash } from 'lucide-react';
import { formatDate } from '../lib/formatDate';
import { isOverdue } from '../lib/isOverdue';
import { Priority } from '../ui/Priority';
import { iconProps } from '../ui/iconProps';

export const TaskCard = ({
  task,
  ref,
  style,
  dimmed = false,
  floating = false,
  onEdit,
  onDelete,
  ...props
}) => {
  const overdue = isOverdue(task);
  const done = task.estado === 'completada';

  return (
    <article
      ref={ref}
      style={style}
      onClick={onEdit}
      className={`group relative rounded-field border bg-surface px-3 py-2.5 text-left transition-[box-shadow,border-color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        floating
          ? 'cursor-grabbing border-brand shadow-pop'
          : 'cursor-grab border-line hover:border-ink-300 hover:shadow-soft'
      } ${dimmed ? 'opacity-35' : ''}`}
      {...props}
    >
      <p
        className={`pr-5 text-[13.5px] leading-snug font-medium ${
          done ? 'text-ink-400 line-through' : 'text-ink'
        }`}
      >
        {task.titulo}
      </p>

      {task.proyecto?.nombre && (
        <p className="mt-1 truncate text-[12px] text-ink-400">{task.proyecto.nombre}</p>
      )}

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <Priority priority={task.prioridad} />
        {task.fechaVencimiento && (
          <span
            title={overdue ? 'Venció y sigue abierta' : 'Fecha de vencimiento'}
            className={`font-mono text-[12px] tabular ${
              overdue ? 'font-medium text-danger' : 'text-ink-400'
            }`}
          >
            {formatDate(task.fechaVencimiento)}
          </span>
        )}
      </div>

      {!floating && (
        <button
          type="button"
          aria-label={`Eliminar la tarea ${task.titulo}`}
          /* Fuera de la tabulación: si no, cada tarjeta gastaría dos paradas. */
          tabIndex={-1}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-1.5 right-1.5 rounded-sm p-1 text-ink-300 opacity-0 transition-colors group-hover:opacity-100 group-focus-visible:opacity-100 hover:bg-danger-soft hover:text-danger"
        >
          <Trash size={16} {...iconProps} />
        </button>
      )}
    </article>
  );
};
