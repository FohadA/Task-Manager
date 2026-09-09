import { useState, useEffect } from 'react';
import { getReports } from '../api/reports';
import { ProductivityLineChart } from '../components/ProductivityLineChart';
import { StatusBarChart } from '../components/StatusBarChart';
import { TopPendingList } from '../components/TopPendingList';
import { EmptyState } from '../ui/EmptyState';
import { ErrorAlert } from '../ui/ErrorAlert';
import { Page } from '../ui/Page';
import { PageHeader } from '../ui/PageHeader';
import { Panel } from '../ui/Panel';
import { PanelHeader } from '../ui/PanelHeader';
import { Spinner } from '../ui/Spinner';
import { StatCard } from '../ui/StatCard';

const STATUS_LABELS = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  completada: 'Completada',
};

const STATUS_COLORS = {
  pendiente: '#3e6ba8',
  en_progreso: '#b4690e',
  completada: '#0d7a55',
};

const initialData = {
  summary: { totalProyectos: 0, totalTareas: 0, tareasCompletadas: 0, porcentajeCompletadas: 0 },
  tasksByStatus: [
    { estado: 'pendiente', count: 0 },
    { estado: 'en_progreso', count: 0 },
    { estado: 'completada', count: 0 },
  ],
  topPendingProjects: [],
  productivity: [],
};

const Reports = () => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getReports();
        setData(result);
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudieron cargar los reportes');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const { summary, tasksByStatus, topPendingProjects, productivity } = data;

  const statusChartData = tasksByStatus.map((item) => ({
    label: STATUS_LABELS[item.estado] || item.estado,
    count: item.count,
    fill: STATUS_COLORS[item.estado],
  }));

  const noTasks = statusChartData.every((item) => item.count === 0);

  return (
    <Page>
      <PageHeader
        title="Reportes"
        summary={loading ? 'Actualizando' : 'Datos de todos los proyectos'}
      />

      {error && (
        <div className="mb-4">
          <ErrorAlert>{error}</ErrorAlert>
        </div>
      )}

      <div className={`flex flex-col gap-4 transition-opacity ${loading ? 'opacity-60' : ''}`}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Proyectos" value={summary.totalProyectos} />
          <StatCard label="Tareas" value={summary.totalTareas} />
          <StatCard label="Completadas" value={summary.tareasCompletadas} />
          <StatCard
            label="Avance"
            value={`${summary.porcentajeCompletadas}%`}
            meter={summary.porcentajeCompletadas}
          />
        </div>

        <Panel>
          <PanelHeader title="Tareas por estado" extra={loading ? <Spinner /> : null} />
          <div className="px-4 pt-5 pb-3">
            {!loading && noTasks ? (
              <EmptyState>No hay tareas registradas.</EmptyState>
            ) : (
              <StatusBarChart data={statusChartData} />
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Proyectos con más tareas pendientes" />
          {!loading && topPendingProjects.length === 0 ? (
            <EmptyState>No hay tareas pendientes.</EmptyState>
          ) : (
            <TopPendingList projects={topPendingProjects} />
          )}
        </Panel>

        <Panel>
          <PanelHeader title="Tareas completadas por día (últimos 30 días)" />
          <div className="px-4 pt-5 pb-3">
            {!loading && productivity.length === 0 ? (
              <EmptyState>Sin tareas completadas en este período.</EmptyState>
            ) : (
              <ProductivityLineChart data={productivity} />
            )}
          </div>
        </Panel>
      </div>
    </Page>
  );
};

export default Reports;
