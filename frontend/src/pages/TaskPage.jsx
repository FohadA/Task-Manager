import { useState, useEffect, useCallback } from 'react';
import * as tasksApi from '../api/tasks';
import * as projectsApi from '../api/projects';
import TaskForm from '../components/TaskForm';

const ESTADOS = [
  { value: '', label: 'Todos los estados' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' },
];

const PRIORIDADES = [
  { value: '', label: 'Todas las prioridades' },
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
];

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroProyecto, setFiltroProyecto] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroPrioridad, setFiltroPrioridad] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    projectsApi.getProjects().then(setProjects).catch(() => {});
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getTasks({
        proyecto: filtroProyecto || undefined,
        estado: filtroEstado || undefined,
        prioridad: filtroPrioridad || undefined,
        page,
        limit: 10,
      });
      setTasks(data.tareas);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, [filtroProyecto, filtroEstado, filtroPrioridad, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFiltroChange = (filterBy) => (e) => {
    filterBy(e.target.value);
    setPage(1);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask({
      ...task,
      fechaVencimiento: task.fechaVencimiento ? task.fechaVencimiento.substring(0, 10) : '',
      proyecto: task.proyecto?._id || task.proyecto,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta tarea?')) return;
    try {
      await tasksApi.deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar la tarea');
    }
  };

  const handleMarcarCompletada = async (task) => {
    try {
      await tasksApi.updateTask(task._id, { estado: 'completada' });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar la tarea');
    }
  };

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        const { proyecto, ...cambios } = data; // el backend no acepta 'proyecto' en update
        await tasksApi.updateTask(editingTask._id, cambios);
      } else {
        await tasksApi.createTask(data);
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar la tarea');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Tareas</h1>
        <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
          + Nueva tarea
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <select value={filtroProyecto} onChange={handleFiltroChange(setFiltroProyecto)} className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todos los proyectos</option>
          {projects.map((p) => <option key={p._id} value={p._id}>{p.nombre}</option>)}
        </select>

        <select value={filtroEstado} onChange={handleFiltroChange(setFiltroEstado)} className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {ESTADOS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>

        <select value={filtroPrioridad} onChange={handleFiltroChange(setFiltroPrioridad)} className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {PRIORIDADES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">{error}</p>}

      {showForm && (
        <div className="mb-6">
          <TaskForm
            initialData={editingTask}
            projects={projects}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingTask(null); }}
            loading={formLoading}
          />
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Cargando...</p>
      ) : tasks.length === 0 ? (
        <p className="text-slate-500">No hay tareas con estos filtros.</p>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-lg shadow flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${task.estado === 'completada' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.titulo}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    task.prioridad === 'alta' ? 'bg-red-100 text-red-700' :
                    task.prioridad === 'media' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {task.prioridad}
                  </span>
                </div>
                {task.descripcion && <p className="text-sm text-slate-600 mt-1">{task.descripcion}</p>}
                {task.fechaVencimiento && (
                  <p className="text-xs text-slate-400 mt-2">Vence: {new Date(task.fechaVencimiento).toLocaleDateString()}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {task.estado !== 'completada' && (
                  <button onClick={() => handleMarcarCompletada(task)} className="text-sm text-green-600 hover:underline">
                    Completar
                  </button>
                )}
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(task)} className="text-sm text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(task._id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded-md border border-slate-300 disabled:opacity-40">
            Anterior
          </button>
          <span className="text-sm text-slate-600">Página {pagination.page} de {pagination.totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages} className="px-3 py-1 rounded-md border border-slate-300 disabled:opacity-40">
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};