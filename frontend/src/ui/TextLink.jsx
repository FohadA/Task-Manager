import { Link } from 'react-router-dom';

export const TextLink = ({ to, children }) => (
  <Link
    to={to}
    className="rounded-field font-medium text-brand-700 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
  >
    {children}
  </Link>
);
