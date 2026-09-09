

export const RowAction = ({ tone = 'neutral', children, ...props }) => (
  <button
    type="button"
    className={`rounded-field px-1.5 py-0.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
      tone === 'danger'
        ? 'text-ink-600 hover:bg-danger-soft hover:text-danger'
        : 'text-ink-600 hover:bg-canvas hover:text-ink'
    }`}
    {...props}
  >
    {children}
  </button>
);
