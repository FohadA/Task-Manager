import { CircleAlert } from 'lucide-react';

export const ErrorAlert = ({ children }) => (
  <p
    role="alert"
    className="flex animate-shake items-start gap-2 rounded-field border border-danger/25 bg-danger-soft px-3 py-2.5 text-[13px] text-danger"
  >
    <CircleAlert size={15} strokeWidth={1.9} aria-hidden="true" className="mt-px shrink-0" />
    <span>{children}</span>
  </p>
);
