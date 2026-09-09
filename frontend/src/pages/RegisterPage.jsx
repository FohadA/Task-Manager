import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { inputClass } from '../ui/controlStyles';
import { AuthLayout } from '../ui/AuthLayout';
import { Button } from '../ui/Button';
import { ErrorAlert } from '../ui/ErrorAlert';
import { FieldError } from '../ui/FieldError';
import { FieldHint } from '../ui/FieldHint';
import { FieldLabel } from '../ui/FieldLabel';
import { PasswordToggle } from '../ui/PasswordToggle';
import { TextLink } from '../ui/TextLink';

export const Register = () => {
  const { register: registerUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    const success = await registerUser(data.nombre, data.email, data.password);
    if (success) navigate('/projects');
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      description="Regístrate para acceder a los proyectos del equipo."
      footer={
        <>
          ¿Ya tienes cuenta? <TextLink to="/login">Inicia sesión</TextLink>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <input
            id="name"
            type="text"
            autoComplete="name"
            autoFocus
            aria-invalid={errors.nombre ? 'true' : 'false'}
            {...register('nombre', { required: 'El nombre es requerido' })}
            className={inputClass(errors.nombre)}
          />
          <FieldError>{errors.nombre?.message}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'El email no tiene un formato válido',
              },
            })}
            className={inputClass(errors.email)}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>

        <div>
          <FieldLabel
            htmlFor="password"
            action={
              <PasswordToggle
                visible={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            }
          >
            Contraseña
          </FieldLabel>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
            })}
            className={inputClass(errors.password)}
          />
          {errors.password ? (
            <FieldError>{errors.password.message}</FieldError>
          ) : (
            <FieldHint>Mínimo 6 caracteres.</FieldHint>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
            className={inputClass(errors.confirmPassword)}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </div>

        {error && <ErrorAlert>{error}</ErrorAlert>}

        <Button type="submit" disabled={loading} loading={loading} block className="mt-1">
          {loading ? 'Creando cuenta' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  );
};
