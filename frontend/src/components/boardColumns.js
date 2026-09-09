export const BOARD_COLUMNS = [
  { status: 'pendiente', label: 'Pendiente', dot: 'bg-info' },
  { status: 'en_progreso', label: 'En progreso', dot: 'bg-warn' },
  { status: 'completada', label: 'Completada', dot: 'bg-ok' },
];

export const isColumnId = (id) => BOARD_COLUMNS.some((c) => c.status === id);
