

export const FieldLabel = ({ htmlFor, children, action }) => (
  <div className="mb-1.5 flex items-baseline justify-between gap-3">
    <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink-600">
      {children}
    </label>
    {action}
  </div>
);
