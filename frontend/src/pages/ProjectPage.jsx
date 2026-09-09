import { useState, useEffect, useCallback } from 'react';
import * as projectsApi from '../api/projects';
import ProjectForm from '../components/ProjectForm';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectsApi.getProjects({ search, sort });
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar los proyectos');
    } finally {
      setLoading(false);
    }
  }, [search, sort]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchProjects, 400);
    return () => clearTimeout(timeoutId);
  }, [fetchProjects]);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject({
      ...project,
      fechaLimite: project.fechaLimite ? project.fechaLimite.substring(0, 10) : '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto? También se eliminarán sus tareas.')) return;
    try {
      await projectsApi.deleteProject(id);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el proyecto');
    }
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingProject) {
        await projectsApi.updateProject(editingProject._id, data);
      } else {
        await projectsApi.createProject(data);
      }
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar el proyecto');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Proyectos</h1>
        <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
          + Nuevo proyecto
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguos primero</option>
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">{error}</p>
      )}

      {showForm && (
        <div className="mb-6">
          <ProjectForm
            initialData={editingProject}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingProject(null); }}
            loading={formLoading}
          />
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Cargando...</p>
      ) : projects.length === 0 ? (
        <p className="text-slate-500">No hay proyectos todavía.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-lg shadow flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">{project.nombre}</h3>
                {project.descripcion && <p className="text-sm text-slate-600 mt-1">{project.descripcion}</p>}
                {project.fechaLimite && (
                  <p className="text-xs text-slate-400 mt-2">
                    Fecha límite: {new Date(project.fechaLimite).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(project)} className="text-sm text-blue-600 hover:underline">
                  Editar
                </button>
                <button onClick={() => handleDelete(project._id)} className="text-sm text-red-600 hover:underline">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};