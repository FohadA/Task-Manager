import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { usuario, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white">
      <div className="flex gap-4">
        <Link to="/projects" className="hover:text-slate-300">Proyectos</Link>
        <Link to="/tasks" className="hover:text-slate-300">Tareas</Link>
        <Link to="/reports" className="hover:text-slate-300">Reportes</Link>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-300">{usuario?.nombre}</span>
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm"
        >
          Salir
        </button>
      </div>
    </nav>
  );
};