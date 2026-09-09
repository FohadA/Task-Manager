

export const ChartTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-field border border-line bg-surface px-3 py-2 shadow-pop">
      <p className="text-[12px] text-ink-400">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">
        {payload[0].value} {unit}
      </p>
    </div>
  );
};
