

const STATUSES = {
  pendiente: { label: 'Pendiente', className: 'border-info/25 bg-info-soft text-info' },
  en_progreso: { label: 'En progreso', className: 'border-warn/25 bg-warn-soft text-warn' },
  completada: { label: 'Completada', className: 'border-ok/25 bg-ok-soft text-ok' },
};

export const StatusBadge = ({ status }) => {
  const item = STATUSES[status] || {
    label: status,
    className: 'border-line bg-canvas text-ink-600',
  };

  return (
    <span
      className={`inline-flex h-5.5 items-center gap-1.5 rounded-field border px-2 text-[12px] font-medium ${item.className}`}
    >
      <span className="h-1.25 w-1.25 shrink-0 rounded-full bg-current" />
      {item.label}
    </span>
  );
};
