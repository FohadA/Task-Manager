import { Search } from 'lucide-react';
import { inputClass, selectClass, selectArrow } from '../ui/controlStyles';
import { iconProps } from '../ui/iconProps';

export const ProjectToolbar = ({ search, onSearchChange, sort, onSortChange }) => (
  <div className="mb-4 flex flex-wrap gap-2">
    <div className="relative min-w-55 flex-1">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center text-ink-400">
        <Search size={16} {...iconProps} />
      </span>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Buscar proyectos por nombre"
        className={`${inputClass(false)} pl-9`}
      />
    </div>

    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
      aria-label="Orden"
      style={selectArrow}
      className={`${selectClass(false)} w-auto min-w-50`}
    >
      <option value="desc">Más recientes primero</option>
      <option value="asc">Más antiguos primero</option>
    </select>
  </div>
);
