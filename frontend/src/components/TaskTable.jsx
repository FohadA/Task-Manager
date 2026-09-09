import { TaskTableRow } from './TaskTableRow';

export const TaskTable = ({ tasks, onComplete, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-215 border-collapse text-left">
      <thead>
        <tr className="border-b border-line">
          <th className="px-5 py-2.5 text-[12.5px] font-medium text-ink-400">Tarea</th>
          <th className="w-42.5 px-4 py-2.5 text-[12.5px] font-medium text-ink-400">Proyecto</th>
          <th className="w-35 px-4 py-2.5 text-[12.5px] font-medium text-ink-400">Estado</th>
          <th className="w-27.5 px-4 py-2.5 text-[12.5px] font-medium text-ink-400">
            Prioridad
          </th>
          <th className="w-27.5 px-4 py-2.5 text-[12.5px] font-medium text-ink-400">Vence</th>
          <th className="w-47.5 px-5 py-2.5 text-right text-[12.5px] font-medium text-ink-400">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskTableRow
            key={task._id}
            task={task}
            onComplete={() => onComplete(task)}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task._id)}
          />
        ))}
      </tbody>
    </table>
  </div>
);
