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
    'relative flex h-10 items-center px-1 text-[13.5px] font-medium transition-colors sm:h-13',
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
      {/* En móvil las secciones bajan a su propia fila: los tres elementos en
          línea suman más que el ancho de un teléfono y desplazaban la página
          en horizontal. Desde sm vuelven a una sola barra, y el `order` deja
          la navegación en medio. */}
      <div className="flex flex-wrap items-center gap-x-4 px-4 sm:flex-nowrap sm:gap-x-7 sm:px-5">
        <div className="flex h-12 min-w-0 items-center sm:h-13">
          <Brand />
        </div>

        <div className="order-2 ml-auto flex h-12 items-center gap-2.5 sm:order-3 sm:h-13">
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

        <nav
          className="order-3 flex w-full items-center gap-5 border-t border-line-soft sm:order-2 sm:w-auto sm:gap-6 sm:border-t-0"
          aria-label="Secciones"
        >
          {SECTIONS.map((section) => (
            <NavLink key={section.to} to={section.to} className={navLinkClass} tabIndex={-1}>
              {section.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
