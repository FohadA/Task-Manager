import logo from '../assets/logo.jpg';

/* El logo es un JPG cuadrado con la marca centrada y un ~16% de margen blanco
   incluido en la propia imagen. Por eso la caja va a 28px (la marca se lee a
   unos 19px) y el hueco hasta el texto es de 8px: los otros 4px los pone el
   margen del archivo. Al no tener transparencia sólo funciona sobre fondo
   blanco, que es el de la barra (bg-surface). */
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
    {/* `truncate` es la válvula: en pantallas de 320px el texto encoge en
          vez de empujar la barra y desplazar la página en horizontal. */}
    <span className="truncate text-[14px] font-semibold text-ink">Gestión de proyectos</span>
  </div>
);
