

export const StatCard = ({ label, value, meter }) => (
  <div className="rounded-card border border-line bg-surface px-5 py-4">
    <p className="text-[12.5px] text-ink-400">{label}</p>
    <p className="mt-1 text-[26px] font-semibold leading-none tracking-tight text-ink tabular">
      {value}
    </p>
    {typeof meter === 'number' && (
      <span className="mt-3 block h-1.5 w-full overflow-hidden rounded-full bg-canvas">
        <span
          className="block h-full rounded-full bg-ok"
          style={{ width: `${Math.min(100, Math.max(0, meter))}%` }}
        />
      </span>
    )}
  </div>
);
