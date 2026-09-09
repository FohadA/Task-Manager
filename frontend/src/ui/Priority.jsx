const PRIORITIES = {
  alta: { label: 'Alta', dot: 'bg-danger', className: 'text-danger font-medium' },
  media: { label: 'Media', dot: 'bg-warn', className: 'text-ink-600' },
  baja: { label: 'Baja', dot: 'bg-ink-300', className: 'text-ink-400' },
};

export const Priority = ({ priority }) => {
  const item = PRIORITIES[priority] || {
    label: priority || '—',
    dot: 'bg-ink-300',
    className: 'text-ink-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] ${item.className}`}>
      <span className={`h-1.25 w-1.25 shrink-0 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
};
