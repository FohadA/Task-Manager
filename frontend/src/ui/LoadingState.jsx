import { Spinner } from './Spinner';

export const LoadingState = ({ children = 'Cargando' }) => (
  <div className="flex items-center justify-center gap-2 px-5 py-14 text-[13.5px] text-ink-400">
    <Spinner />
    {children}
  </div>
);
