


export const TopPendingList = ({ projects }) => {
  const max = Math.max(1, ...projects.map((p) => p.pendingCount));

  return (
    <ol className="divide-y divide-line-soft">
      {projects.map((project, index) => (
        <li key={project.proyectoId} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
          <span className="w-4 shrink-0 font-mono text-[12px] text-ink-400">{index + 1}</span>
          <span className="min-w-0 flex-1 truncate text-[14px] text-ink">
            {project.proyectoNombre}
          </span>
          <span className="hidden h-1.5 w-40 shrink-0 overflow-hidden rounded-full bg-canvas sm:block">
            <span
              className="block h-full rounded-full bg-info"
              style={{ width: `${(project.pendingCount / max) * 100}%` }}
            />
          </span>
          <span className="w-10 shrink-0 text-right font-mono text-[13px] font-medium text-ink tabular sm:w-16">
            {project.pendingCount}
          </span>
        </li>
      ))}
    </ol>
  );
};
