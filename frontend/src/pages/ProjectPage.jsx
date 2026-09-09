import { useState, useEffect, useCallback } from 'react';
import * as projectsApi from '../api/projects';
import ProjectForm from '../components/ProjectForm';
import { ProjectTable } from '../components/ProjectTable';
import { ProjectToolbar } from '../components/ProjectToolbar';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { ErrorAlert } from '../ui/ErrorAlert';
import { LoadingState } from '../ui/LoadingState';
import { Page } from '../ui/Page';
import { PageHeader } from '../ui/PageHeader';
import { Panel } from '../ui/Panel';
import { iconProps } from '../ui/iconProps';

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
        const newData = {
          descripcion: data.descripcion,
          fechaLimite: data.fechaLimite,
          nombre: data.nombre
        }
        await projectsApi.updateProject(editingProject._id, newData);
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

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <Page>
      <PageHeader
        title="Proyectos"
        summary={
          loading
            ? 'Cargando'
            : `${projects.length} ${projects.length === 1 ? 'proyecto' : 'proyectos'}`
        }
      >
        <Button onClick={handleCreate}>
          <Plus size={16} {...iconProps} />
          Nuevo proyecto
        </Button>
      </PageHeader>

      <ProjectToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      {error && (
        <div className="mb-4">
          <ErrorAlert>{error}</ErrorAlert>
        </div>
      )}

      {showForm && (
        <div className="mb-4">
          <ProjectForm
            initialData={editingProject}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            loading={formLoading}
          />
        </div>
      )}

      <Panel>
        {loading ? (
          <LoadingState />
        ) : projects.length === 0 ? (
          <EmptyState>
            {search
              ? 'Ningún proyecto coincide con la búsqueda.'
              : 'Todavía no hay proyectos. Crea el primero para empezar a registrar tareas.'}
          </EmptyState>
        ) : (
          <ProjectTable projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </Panel>
    </Page>
  );
};
