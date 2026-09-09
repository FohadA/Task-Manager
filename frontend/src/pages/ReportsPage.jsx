import { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from 'recharts';
import { getReports } from '../api/reports';

const ESTADO_LABELS = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  completada: 'Completada',
};

const ESTADO_COLORS = {
  pendiente: '#f59e0b',
  en_progreso: '#3b82f6',
  completada: '#10b981',
};

const InitialData = {
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
  const [data, setData] = useState(InitialData);
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

  const chartTasksByStatus = tasksByStatus.map((item) => ({
    estado: ESTADO_LABELS[item.estado] || item.estado,
    count: item.count,
    fill: ESTADO_COLORS[item.estado],
  }));

  return (
    <div className={`max-w-5xl mx-auto px-4 py-8 space-y-8 transition-opacity ${loading ? 'opacity-60' : 'opacity-100'}`}>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-800">Reportes</h1>
        {loading && <span className="text-sm text-slate-400">Actualizando...</span>}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
      )}

      {/* Resumen general */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-slate-500">Total proyectos</p>
          <p className="text-2xl font-bold text-slate-800">{summary.totalProyectos}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-slate-500">Total tareas</p>
          <p className="text-2xl font-bold text-slate-800">{summary.totalTareas}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-slate-500">Tareas completadas</p>
          <p className="text-2xl font-bold text-slate-800">{summary.tareasCompletadas}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-slate-500">% completadas</p>
          <p className="text-2xl font-bold text-green-600">{summary.porcentajeCompletadas}%</p>
        </div>
      </div>

      {/* Tareas por estado */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Tareas por estado</h2>
        {!loading && chartTasksByStatus.every((c) => c.count === 0) ? (
          <p className="text-slate-500 text-sm">No hay tareas todavía.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartTasksByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="Tareas" radius={[4, 4, 0, 0]}>
                {chartTasksByStatus.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top 5 proyectos con más pendientes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Proyectos con más tareas pendientes</h2>
        {!loading && topPendingProjects.length === 0 ? (
          <p className="text-slate-500 text-sm">No hay tareas pendientes.</p>
        ) : (
          <ol className="space-y-2">
            {topPendingProjects.map((p, i) => (
              <li key={p.proyectoId} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{i + 1}. {p.proyectoNombre}</span>
                <span className="font-semibold text-amber-600">{p.pendingCount} pendientes</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Productividad por fecha */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Productividad (últimos 30 días)</h2>
        {!loading && productivity.length === 0 ? (
          <p className="text-slate-500 text-sm">Sin tareas completadas en este período.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={productivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="completedCount" name="Completadas" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Reports;