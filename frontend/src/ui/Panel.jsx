

export const Panel = ({ children, className = '' }) => (
  <div className={`overflow-hidden rounded-card border border-line bg-surface ${className}`}>
    {children}
  </div>
);
