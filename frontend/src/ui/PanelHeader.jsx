

export const PanelHeader = ({ title, extra }) => (
  <div className="flex items-center justify-between gap-3 border-b border-line-soft px-5 py-3.5">
    <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
    {extra}
  </div>
);
