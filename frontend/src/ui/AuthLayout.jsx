import { Brand } from './Brand';



export const AuthLayout = ({ title, description, footer, children }) => {

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="flex h-13 shrink-0 items-center border-b border-line bg-surface px-4 sm:px-5">
        <Brand />
      </header>

      <main
        className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.035) 0 1px, transparent 1px 32px)',
        }}
      >
        <div className="w-full max-w-98">
          <section className="rounded-card border border-line bg-surface shadow-card">
            <div className="border-b border-line-soft px-5 pt-6 pb-4 sm:px-7 sm:pt-7 sm:pb-5">
              <h1 className="text-[20px] font-semibold leading-tight text-ink">{title}</h1>
              {description && <p className="mt-1.5 text-[13.5px] text-ink-600">{description}</p>}
            </div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">{children}</div>

            <div className="border-t border-line-soft px-5 py-4 text-[13px] text-ink-600 sm:px-7">
              {footer}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
