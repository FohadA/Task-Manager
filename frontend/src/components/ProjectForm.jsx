import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const valoresVacios = { nombre: '', descripcion: '', fechaLimite: '' };

const ProjectForm = ({ initialData, onSubmit, onCancel, loading }) => {
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
        <input
          type="text"
          {...register('nombre', {
            required: 'El nombre es requerido',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nombre ? 'border-red-500' : 'border-slate-300'
          }`}
        />
        {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre.message}</p>}
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Fecha límite</label>
        <input
          type="date"
          {...register('fechaLimite')}
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
          {loading ? 'Guardando...' : initialData ? 'Guardar cambios' : 'Crear proyecto'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;