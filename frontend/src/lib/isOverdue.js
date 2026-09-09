

export const isOverdue = (task) => {
  if (!task?.fechaVencimiento || task.estado === 'completada') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(task.fechaVencimiento) < today;
};
