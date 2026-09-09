import { ProjectTableRow } from './ProjectTableRow';

export const ProjectTable = ({ projects, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-140 border-collapse text-left">
      <thead>
        <tr className="border-b border-line">
          <th className="px-5 py-2.5 text-[12.5px] font-medium text-ink-400">Proyecto</th>
          <th className="w-35 px-5 py-2.5 text-[12.5px] font-medium text-ink-400">
            Fecha límite
          </th>
          <th className="w-32 px-5 py-2.5 text-right text-[12.5px] font-medium text-ink-400">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <ProjectTableRow
            key={project._id}
            project={project}
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project._id)}
          />
        ))}
      </tbody>
    </table>
  </div>
);
