import { formatDate } from '../lib/formatDate';
import { Priority } from '../ui/Priority';
import { RowAction } from '../ui/RowAction';
import { StatusBadge } from '../ui/StatusBadge';

export const TaskTableRow = ({ task, onComplete, onEdit, onDelete }) => {
  const done = task.estado === 'completada';

  return (
    <tr className="border-b border-line-soft last:border-b-0 hover:bg-canvas">
      <td className="px-5 py-3 align-top">
        <p
          className={`text-[14px] font-medium ${done ? 'text-ink-400 line-through' : 'text-ink'}`}
        >
          {task.titulo}
        </p>
        {task.descripcion && (
          <p className="mt-0.5 max-w-[46ch] text-[13px] leading-relaxed text-ink-600">
            {task.descripcion}
          </p>
        )}
      </td>
      <td className="px-4 py-3 align-top text-[13px] text-ink-600">
        {task.proyecto?.nombre || '—'}
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
