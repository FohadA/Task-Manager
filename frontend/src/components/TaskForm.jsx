import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const valoresVacios = {
  titulo: '',
  descripcion: '',
  estado: 'pendiente',
  prioridad: 'media',
  fechaVencimiento: '',
  proyecto: '',
};

const TaskForm = ({ initialData, projects, onSubmit, onCancel, loading }) => {
  const esEdicion = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData || valoresVacios });

  useEffect(() => {
    reset(initialData || valoresVacios);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
        <input
          type="text"
          {...register('titulo', {
            required: 'El título es requerido',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.titulo ? 'border-red-500' : 'border-slate-300'
          }`}
        />
        {errors.titulo && <p className="text-sm text-red-600 mt-1">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
        <textarea
          {...register('descripcion')}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Proyecto</label>
        <select
          {...register('proyecto', { required: 'Selecciona un proyecto' })}
          disabled={esEdicion}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500 ${
            errors.proyecto ? 'border-red-500' : 'border-slate-300'
          }`}
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>
        {errors.proyecto && <p className="text-sm text-red-600 mt-1">{errors.proyecto.message}</p>}
        {esEdicion && <p className="text-xs text-slate-400 mt-1">El proyecto no se puede cambiar una vez creada la tarea.</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
          <select {...register('estado')} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Prioridad</label>
          <select {...register('prioridad')} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de vencimiento</label>
        <input
          type="date"
          {...register('fechaVencimiento')}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100">
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium"
        >
          {loading ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear tarea'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;