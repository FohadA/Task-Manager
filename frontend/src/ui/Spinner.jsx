import { LoaderCircle } from 'lucide-react';

export const Spinner = ({ size = 14 }) => (
  <LoaderCircle
    size={size}
    strokeWidth={2.4}
    aria-hidden="true"
    className="shrink-0 animate-spin"
  />
);
