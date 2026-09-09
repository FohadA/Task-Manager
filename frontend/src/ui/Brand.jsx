import logo from '../assets/logo.jpg';


export const Brand = () => (
  <div className="flex min-w-0 items-center gap-2">
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      className="h-7 w-7 shrink-0 object-contain"
    />
    <span className="truncate text-[14px] font-semibold text-ink">Gestión de proyectos</span>
  </div>
);
