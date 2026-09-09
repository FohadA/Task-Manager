import { formatDate } from '../lib/formatDate';
import { RowAction } from '../ui/RowAction';

export const ProjectTableRow = ({ project, onEdit, onDelete }) => (
  <tr className="border-b border-line-soft last:border-b-0 hover:bg-canvas">
    <td className="px-5 py-3 align-top">
      <p className="text-[14px] font-medium text-ink wrap-break-word line-clamp-1">{project.nombre}</p>
      {project.descripcion && (
        <p className="mt-0.5 max-w-[52ch] text-[13px] leading-relaxed text-ink-600 wrap-break-word line-clamp-1">
          {project.descripcion}
        </p>
      )}
    </td>
    <td className="px-5 py-3 align-top font-mono text-[12.5px] text-ink-600">
      {formatDate(project.fechaLimite)}
    </td>
    <td className="px-5 py-3 text-right align-top whitespace-nowrap">
      <RowAction onClick={onEdit}>Editar</RowAction>
      <RowAction tone="danger" onClick={onDelete}>
        Eliminar
      </RowAction>
    </td>
  </tr>
);
