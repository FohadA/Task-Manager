import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import * as tasksApi from '../api/tasks';
import * as projectsApi from '../api/projects';
import TaskForm from '../components/TaskForm';
import { TaskBoard } from '../components/TaskBoard';
import { TaskTable } from '../components/TaskTable';
import { TaskToolbar } from '../components/TaskToolbar';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { ErrorAlert } from '../ui/ErrorAlert';
import { LoadingState } from '../ui/LoadingState';
import { Page } from '../ui/Page';
import { PageHeader } from '../ui/PageHeader';
import { Pagination } from '../ui/Pagination';
import { Panel } from '../ui/Panel';
import { iconProps } from '../ui/iconProps';

/* El tablero no pagina: se trae todas las tareas del filtro de una vez. */
const PAGE_SIZE = { board: 200, list: 10 };

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('board');
  const [projectFilter, setProjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const isBoard = view === 'board';

  useEffect(() => {
    projectsApi.getProjects().then(setProjects).catch(() => {});
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getTasks({
        proyecto: projectFilter || undefined,
        /* En el tablero el estado es la columna, no un filtro. */
        estado: isBoard ? undefined : statusFilter || undefined,
        prioridad: priorityFilter || undefined,
        page: isBoard ? 1 : page,
        limit: PAGE_SIZE[view],
      });
      setTasks(data.tareas);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, [projectFilter, statusFilter, priorityFilter, page, view, isBoard]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const applyFilter = (setFilter) => (value) => {
    setFilter(value);
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

  const handleComplete = async (task) => {
    try {
      await tasksApi.updateTask(task._id, { estado: 'completada' });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar la tarea');
    }
  };

  /* El tablero ya pintó el cambio antes de llamar a la API: si el servidor lo
     rechaza, devolvemos la tarjeta a su columna de origen y avisamos. */
  const handleStatusChange = useCallback(async (id, nextStatus, previousStatus) => {
    setError(null);
    try {
      await tasksApi.updateTask(id, { estado: nextStatus });
    } catch (err) {
      setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, estado: previousStatus } : t)));
      setError(err.response?.data?.message || 'No se pudo mover la tarea. Vuelve a intentarlo.');
    }
  }, []);

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        const { proyecto, ...changes } = data; // el backend no acepta 'proyecto' en update
        void proyecto;
        console.log(changes)
        const newData = {
          descripcion: changes.descripcion,
          estado: changes.estado,
          fechaVencimiento: changes.fechaVencimiento,
          prioridad: changes.prioridad,
          titulo: changes.titulo,
        }
        await tasksApi.updateTask(editingTask._id, newData);
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

  const changeView = (next) => {
    setView(next);
    setPage(1);
    if (next === 'board') setStatusFilter('');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const clearFilters = () => {
    setProjectFilter('');
    setStatusFilter('');
    setPriorityFilter('');
    setPage(1);
  };

  const hasFilters = Boolean(projectFilter || priorityFilter || (!isBoard && statusFilter));
  const visibleTotal = isBoard ? tasks.length : pagination.total;

  const emptyMessage = hasFilters
    ? 'No hay tareas con estos filtros.'
    : 'Todavía no hay tareas. Crea la primera para empezar a asignar trabajo.';

  return (
    <Page width={isBoard ? 'max-w-6xl' : 'max-w-5xl'}>
      <PageHeader
        title="Tareas"
        summary={
          loading
            ? 'Cargando'
            : `${visibleTotal} ${visibleTotal === 1 ? 'tarea' : 'tareas'}${
                hasFilters ? ' con estos filtros' : ''
              }`
        }
      >
        <Button onClick={handleCreate}>
          <Plus size={16} {...iconProps} />
          Nueva tarea
        </Button>
      </PageHeader>

      <TaskToolbar
        view={view}
        onViewChange={changeView}
        projects={projects}
        projectFilter={projectFilter}
        onProjectFilterChange={applyFilter(setProjectFilter)}
        statusFilter={statusFilter}
        onStatusFilterChange={applyFilter(setStatusFilter)}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={applyFilter(setPriorityFilter)}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      {error && (
        <div className="mb-4">
          <ErrorAlert>{error}</ErrorAlert>
        </div>
      )}

      {showForm && (
        <div className="mb-4">
          <TaskForm
            initialData={editingTask}
            projects={projects}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            loading={formLoading}
          />
        </div>
      )}

      {loading ? (
        <Panel>
          <LoadingState />
        </Panel>
      ) : tasks.length === 0 ? (
        <Panel>
          <EmptyState>{emptyMessage}</EmptyState>
        </Panel>
      ) : isBoard ? (
        <>
          <TaskBoard
            tasks={tasks}
            setTasks={setTasks}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <p className="mt-3 text-[12.5px] text-ink-400">
            Arrastra una tarjeta a otra columna para cambiar su estado. Con el teclado: tabula hasta
            la tarjeta, Espacio para agarrarla, flechas para moverla y Espacio otra vez para
            soltarla.
          </p>
        </>
      ) : (
        <Panel>
          <TaskTable
            tasks={tasks}
            onComplete={handleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {pagination.totalPages > 1 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onChange={setPage}
            />
          )}
        </Panel>
      )}
    </Page>
  );
};
