

export const SegmentedControl = ({ value, onChange, options, label, tabIndex }) => (
  <div
    role="group"
    aria-label={label}
    className="flex h-9.5 shrink-0 gap-0.75 rounded-field border border-line bg-canvas p-0.75"
  >
    {options.map((option) => {
      const active = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={active}
          tabIndex={tabIndex}
          onClick={() => onChange(option.value)}
          className={`inline-flex items-center gap-1.5 rounded-sm px-3 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand ${
            active
              ? 'bg-surface font-semibold text-ink shadow-soft'
              : 'font-medium text-ink-600 hover:text-ink'
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      );
    })}
  </div>
);
