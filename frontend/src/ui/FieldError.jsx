

export const FieldError = ({ children }) =>
  children ? <p className="mt-1.5 text-[12.5px] text-danger">{children}</p> : null;
