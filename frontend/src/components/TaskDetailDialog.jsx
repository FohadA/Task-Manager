import { SquarePen, Trash, X } from 'lucide-react';
import { formatDate } from '../lib/formatDate';
import { isOverdue } from '../lib/isOverdue';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Priority } from '../ui/Priority';
import { StatusBadge } from '../ui/StatusBadge';
import { iconProps } from '../ui/iconProps';

export const TaskDetailDialog = ({ task, onEdit, onDelete, onClose }) => {
  const overdue = isOverdue(task);

  return (
    <Modal
      labelledBy="task-detail-title"
      onClose={onClose}
      className="w-[min(94vw,520px)]"
    >
      <div className="flex items-start gap-3 border-b border-line-soft px-5 pt-5 pb-4">
        <div className="min-w-0 flex-1">
          <h2
            id="task-detail-title"
            className={`text-[17px] leading-snug font-semibold wrap-anywhere ${
              task.estado === 'completada' ? 'text-ink-400 line-through' : 'text-ink'
            }`}
          >
            {task.titulo}
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusBadge status={task.estado} />
            <Priority priority={task.prioridad} />
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="-mt-1 -mr-1 shrink-0 rounded-field p-1.5 text-ink-400 transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <X size={17} {...iconProps} />
        </button>
      </div>

      <dl className="divide-y divide-line-soft">
        <Row label="Proyecto">{task.proyecto?.nombre || '—'}</Row>
        <Row label="Vencimiento">
          <span className={`font-mono text-[13px] ${overdue ? 'font-medium text-danger' : ''}`}>
            {formatDate(task.fechaVencimiento)}
          </span>
          {overdue && <span className="ml-2 text-[12.5px] text-danger">venció y sigue abierta</span>}
        </Row>
        {task.createdAt && (
          <Row label="Creada">
            <span className="font-mono text-[13px]">{formatDate(task.createdAt)}</span>
          </Row>
        )}
      </dl>

      <div className="border-t border-line-soft px-5 py-4">
        <h3 className="text-[13px] font-medium text-ink-600">Descripción</h3>
        {task.descripcion ? (
          <p className="mt-2 max-h-60 overflow-y-auto text-[14px] leading-relaxed whitespace-pre-wrap text-ink-800 wrap-anywhere">
            {task.descripcion}
          </p>
        ) : (
          <p className="mt-2 text-[13.5px] text-ink-400">Esta tarea no tiene descripción.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-soft px-5 py-3.5">
        <span className="truncate font-mono text-[11px] text-ink-300" title={`ID ${task._id}`}>
          {task._id}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <Button type="button" variant="secondary" onClick={onDelete}>
            <Trash size={15} {...iconProps} />
            Eliminar
          </Button>
          <Button type="button" onClick={onEdit} autoFocus>
            <SquarePen size={15} {...iconProps} />
            Editar tarea
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const Row = ({ label, children }) => (
  <div className="flex items-baseline gap-4 px-5 py-2.5">
    <dt className="w-28 shrink-0 text-[13px] text-ink-400">{label}</dt>
    <dd className="min-w-0 flex-1 text-[13.5px] text-ink-800 wrap-anywhere">
      {children}
    </dd>
  </div>
);
