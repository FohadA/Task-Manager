import logo from "../assets/logo.jpg";

export const Brand = () => (
  <div className="flex items-center gap-2.5">
    <img src={logo} alt="Logo" className="h-6 w-6" />
    <span className="text-[14px] font-semibold text-ink">Gestión de tareas</span>
  </div>
);
