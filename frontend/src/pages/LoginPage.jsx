import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { inputClass } from '../ui/controlStyles';
import { AuthLayout } from '../ui/AuthLayout';
import { Button } from '../ui/Button';
import { ErrorAlert } from '../ui/ErrorAlert';
import { FieldError } from '../ui/FieldError';
import { FieldLabel } from '../ui/FieldLabel';
import { PasswordToggle } from '../ui/PasswordToggle';
import { TextLink } from '../ui/TextLink';

export const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) navigate('/projects');
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      description="Usa tu cuenta de empresa."
      footer={
        <>
          ¿No tienes cuenta? <TextLink to="/register">Crear cuenta</TextLink>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', { required: 'La contraseña es requerida' })}
            className={inputClass(errors.password)}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </div>

        {error && <ErrorAlert>{error}</ErrorAlert>}

        <Button type="submit" disabled={loading} loading={loading} block className="mt-1">
          {loading ? 'Comprobando' : 'Iniciar sesión'}
        </Button>
      </form>
    </AuthLayout>
  );
};
