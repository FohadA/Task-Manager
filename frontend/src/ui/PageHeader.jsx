

export const PageHeader = ({ title, summary, children }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-ink">{title}</h1>
      {summary && <p className="mt-1 text-[13px] text-ink-400 tabular">{summary}</p>}
    </div>
    {children && <div className="flex items-center gap-2">{children}</div>}
  </div>
);
