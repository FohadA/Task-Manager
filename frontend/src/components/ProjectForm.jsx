import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { inputClass, textareaClass } from '../ui/controlStyles';
import { Button } from '../ui/Button';
import { FieldError } from '../ui/FieldError';
import { FieldLabel } from '../ui/FieldLabel';

/* Las claves son los campos que espera la API, por eso van en español. */
const emptyValues = { nombre: '', descripcion: '', fechaLimite: '' };

const ProjectForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData || emptyValues });

  useEffect(() => {
    reset(initialData || emptyValues);
  }, [initialData, reset]);

  const isEditing = Boolean(initialData);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-card border border-line bg-surface shadow-soft"
    >
      <div className="border-b border-line-soft px-5 py-3.5">
        <h2 className="text-[15px] font-semibold text-ink">
          {isEditing ? 'Editar proyecto' : 'Nuevo proyecto'}
        </h2>
      </div>

      <div className="flex flex-col gap-4 px-5 py-5">
        <div>
          <FieldLabel htmlFor="project-name">Nombre</FieldLabel>
          <input
            id="project-name"
            type="text"
            autoFocus
            aria-invalid={errors.nombre ? 'true' : 'false'}
            {...register('nombre', {
              required: 'El nombre es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
            className={inputClass(errors.nombre)}
          />
          <FieldError>{errors.nombre?.message}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="project-description">Descripción</FieldLabel>
          <textarea
            id="project-description"
            rows={3}
            {...register('descripcion')}
            className={textareaClass(false)}
          />
        </div>

        <div className="max-w-55">
          <FieldLabel htmlFor="project-due-date">Fecha límite</FieldLabel>
          <input
            id="project-due-date"
            type="date"
            {...register('fechaLimite')}
            className={inputClass(false)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-line-soft px-5 py-3.5">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? 'Guardando' : isEditing ? 'Guardar cambios' : 'Crear proyecto'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
