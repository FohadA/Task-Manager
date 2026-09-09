import { formatDate } from '../lib/formatDate';
import { Priority } from '../ui/Priority';
import { RowAction } from '../ui/RowAction';
import { StatusBadge } from '../ui/StatusBadge';

export const TaskTableRow = ({ task, onOpen, onComplete, onEdit, onDelete }) => {
  const done = task.estado === 'completada';

  return (
    <tr className="border-b border-line-soft last:border-b-0 hover:bg-canvas">
      <td className="px-5 py-3 align-top">
        <div className="max-w-110">
          <button
            type="button"
            onClick={onOpen}
            title={task.titulo}
            className={`line-clamp-1 w-full rounded-sm text-left text-[14px] font-medium wrap-anywhere underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              done ? 'text-ink-400 line-through' : 'text-ink'
            }`}
          >
            {task.titulo}
          </button>
          {task.descripcion && (
            <p
              title={task.descripcion}
              className="mt-0.5 line-clamp-1 max-w-[46ch] text-[13px] leading-relaxed text-ink-600 wrap-anywhere"
            >
              {task.descripcion}
            </p>
          )}
        </div>
      </td>
      <td className="px-4 py-3 align-top">
        <StatusBadge status={task.estado} />
      </td>
      <td className="px-4 py-3 align-top">
        <Priority priority={task.prioridad} />
      </td>
      <td className="px-4 py-3 align-top font-mono text-[12.5px] text-ink-600">
        {formatDate(task.fechaVencimiento)}
      </td>
      <td className="px-5 py-3 text-right align-top whitespace-nowrap">
        {!done && <RowAction onClick={onComplete}>Completar</RowAction>}
        <RowAction onClick={onEdit}>Editar</RowAction>
        <RowAction tone="danger" onClick={onDelete}>
          Eliminar
        </RowAction>
      </td>
    </tr>
  );
};
