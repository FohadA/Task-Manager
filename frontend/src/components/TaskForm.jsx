import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { inputClass, selectClass, textareaClass, selectArrow } from '../ui/controlStyles';
import { Button } from '../ui/Button';
import { FieldError } from '../ui/FieldError';
import { FieldHint } from '../ui/FieldHint';
import { FieldLabel } from '../ui/FieldLabel';

const emptyValues = {
  titulo: '',
  descripcion: '',
  estado: 'pendiente',
  prioridad: 'media',
  fechaVencimiento: '',
  proyecto: '',
};

const TaskForm = ({ initialData, projects, onSubmit, onCancel, loading }) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData || emptyValues });

  useEffect(() => {
    reset(initialData || emptyValues);
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-card border border-line bg-surface shadow-soft"
    >
      <div className="border-b border-line-soft px-5 py-3.5">
        <h2 className="text-[15px] font-semibold text-ink">
          {isEditing ? 'Editar tarea' : 'Nueva tarea'}
        </h2>
      </div>

      <div className="flex flex-col gap-4 px-5 py-5">
        <div>
          <FieldLabel htmlFor="task-title">Título</FieldLabel>
          <input
            id="task-title"
            type="text"
            autoFocus
            aria-invalid={errors.titulo ? 'true' : 'false'}
            {...register('titulo', {
              required: 'El título es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
            className={inputClass(errors.titulo)}
          />
          <FieldError>{errors.titulo?.message}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="task-description">Descripción</FieldLabel>
          <textarea
            id="task-description"
            rows={3}
            {...register('descripcion')}
            className={textareaClass(false)}
          />
        </div>

        <div>
          <FieldLabel htmlFor="task-project">Proyecto</FieldLabel>
          <select
            id="task-project"
            disabled={isEditing}
            aria-invalid={errors.proyecto ? 'true' : 'false'}
            style={selectArrow}
            {...register('proyecto', { required: 'Selecciona un proyecto' })}
            className={selectClass(errors.proyecto)}
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.nombre}
              </option>
            ))}
          </select>
          <FieldError>{errors.proyecto?.message}</FieldError>
          {isEditing && <FieldHint>El proyecto no se puede cambiar una vez creada la tarea.</FieldHint>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <FieldLabel htmlFor="task-status">Estado</FieldLabel>
            <select
              id="task-status"
              style={selectArrow}
              {...register('estado')}
              className={selectClass(false)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="task-priority">Prioridad</FieldLabel>
            <select
              id="task-priority"
              style={selectArrow}
              {...register('prioridad')}
              className={selectClass(false)}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="task-due-date">Vencimiento</FieldLabel>
            <input
              id="task-due-date"
              type="date"
              {...register('fechaVencimiento')}
              className={inputClass(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-line-soft px-5 py-3.5">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? 'Guardando' : isEditing ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
