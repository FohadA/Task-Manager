import { Spinner } from './Spinner';

const BASE =
  'inline-flex h-[38px] shrink-0 items-center justify-center gap-2 rounded-field px-3.5 text-[14px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS = {
  primary: 'bg-brand text-white hover:bg-brand-700 active:bg-brand-800 disabled:hover:bg-brand',
  secondary:
    'border border-line bg-surface text-ink-800 hover:border-ink-300 hover:bg-canvas disabled:hover:bg-surface',
  ghost: 'text-ink-600 hover:bg-canvas hover:text-ink',
  danger:
    'bg-danger text-white hover:bg-danger-700 active:bg-danger-800 focus-visible:outline-danger disabled:hover:bg-danger',
};

export const Button = ({
  variant = 'primary',
  loading = false,
  block = false,
  children,
  className = '',
  ...props
}) => (
  <button
    className={`${BASE} ${VARIANTS[variant]} ${block ? 'w-full' : ''} ${className}`}
    {...props}
  >
    {loading && <Spinner />}
    {children}
  </button>
);
