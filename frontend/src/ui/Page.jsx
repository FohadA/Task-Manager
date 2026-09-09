

export const Page = ({ children, width = 'max-w-5xl' }) => (
  <div className={`mx-auto w-full ${width} px-5 py-7`}>{children}</div>
);
