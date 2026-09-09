/* Una tarea está vencida si su fecha ya pasó y sigue sin completarse.
   `estado` y `fechaVencimiento` son campos de la API, van en español. */
export const isOverdue = (task) => {
  if (!task?.fechaVencimiento || task.estado === 'completada') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.fechaVencimiento) < today;
};
