

export const Page = ({ children, width = 'max-w-5xl' }) => (
  <div className={`mx-auto w-full ${width} px-4 py-5 sm:px-5 sm:py-7`}>{children}</div>
);
