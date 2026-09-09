/* Fecha corta en formato español. Devuelve una raya cuando no hay valor,
   para que la columna siga leyéndose en las tablas. */
export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '—';
