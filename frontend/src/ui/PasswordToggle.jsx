


export const PasswordToggle = ({ visible, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="rounded-field text-[12.5px] font-medium text-ink-400 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
  >
    {visible ? 'Ocultar' : 'Mostrar'}
  </button>
);
