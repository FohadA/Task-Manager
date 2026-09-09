import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Brand } from '../ui/Brand';

/* La navegación queda fuera del orden de tabulación a propósito: en Tareas
   el foco debe llegar directo a las tarjetas del tablero. Sigue siendo
   accesible con el ratón y sale en el árbol de accesibilidad. */
const SECTIONS = [
  { to: '/projects', label: 'Proyectos' },
  { to: '/tasks', label: 'Tareas' },
  { to: '/reports', label: 'Reportes' },
];

const navLinkClass = ({ isActive }) =>
  [
    'relative flex h-[52px] items-center px-1 text-[13.5px] font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand',
    'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:content-[""]',
    isActive ? 'text-ink after:bg-brand' : 'text-ink-600 hover:text-ink after:bg-transparent',
  ].join(' ');

export const Navbar = () => {
  const { usuario, logout } = useAuth();

  const initials = (usuario?.nombre || '?')
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface">
      <div className="flex h-13 items-center gap-7 px-5">
        <Brand />

        <nav className="flex items-center gap-6" aria-label="Secciones">
          {SECTIONS.map((section) => (
            <NavLink key={section.to} to={section.to} className={navLinkClass} tabIndex={-1}>
              {section.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <span
            className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-canvas text-[11px] font-semibold text-ink-600 ring-1 ring-line"
            aria-hidden="true"
          >
            {initials}
          </span>
          <span className="hidden text-[13px] text-ink-600 sm:inline">{usuario?.nombre}</span>
          <button
            onClick={logout}
            tabIndex={-1}
            className="ml-1 rounded-field border border-line px-2.5 py-1 text-[13px] font-medium text-ink-600 transition-colors hover:border-ink-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};
