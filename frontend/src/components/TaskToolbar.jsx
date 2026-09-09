import { Columns3, List } from 'lucide-react';
import { selectClass, selectArrow } from '../ui/controlStyles';
import { Button } from '../ui/Button';
import { SegmentedControl } from '../ui/SegmentedControl';
import { iconProps } from '../ui/iconProps';


const STATUS_OPTIONS = [
  { value: '', label: 'Todos los estados' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: 'Todas las prioridades' },
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
];

const VIEW_OPTIONS = [
  { value: 'board', label: 'Tablero', icon: <Columns3 size={15} {...iconProps} /> },
  { value: 'list', label: 'Lista', icon: <List size={15} {...iconProps} /> },
];

export const TaskToolbar = ({
  view,
  onViewChange,
  projects,
  projectFilter,
  onProjectFilterChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  hasFilters,
  onClearFilters,
}) => {
  const isBoard = view === 'board';

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <SegmentedControl
        tabIndex={-1}
        label="Vista de las tareas"
        value={view}
        onChange={onViewChange}
        options={VIEW_OPTIONS}
      />

      <select
        value={projectFilter}
        onChange={(e) => onProjectFilterChange(e.target.value)}
        aria-label="Filtrar por proyecto"
        tabIndex={-1}
        style={selectArrow}
        className={`${selectClass(false)} w-auto min-w-47.5`}
      >
        <option value="">Todos los proyectos</option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.nombre}
          </option>
        ))}
      </select>


      {!isBoard && (
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          aria-label="Filtrar por estado"
          tabIndex={-1}
          style={selectArrow}
          className={`${selectClass(false)} w-auto min-w-47.5`}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      <select
        value={priorityFilter}
        onChange={(e) => onPriorityFilterChange(e.target.value)}
        aria-label="Filtrar por prioridad"
        tabIndex={-1}
        style={selectArrow}
        className={`${selectClass(false)} w-auto min-w-47.5`}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasFilters && (
        <Button variant="ghost" onClick={onClearFilters} tabIndex={-1}>
          Quitar filtros
        </Button>
      )}
    </div>
  );
};
