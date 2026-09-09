## Tecnologías

- React 18 + Vite
- React Router DOM v6 (rutas protegidas)
- Context API (estado de autenticación)
- React Hook Form (formularios y validación)
- Axios (cliente HTTP con interceptores)
- Tailwind CSS v4 (estilos)
- Recharts (gráficos de reportes)

## Instalación y ejecución local

### Prerrequisitos
- Node.js v18 o superior
- El backend corriendo (ver `/backend/README.md`)

### Pasos

1. Entrar a la carpeta frontend
```bash
   cd frontend
```

2. Instalar dependencias
```bash
   npm install
```

3. Configurar variables de entorno
```bash
   cp .env.example .env
```
   > Windows CMD: `copy .env.example .env` — PowerShell: `Copy-Item .env.example .env`

4. Levantar el servidor de desarrollo
```bash
   npm run dev
```
   La app corre en `http://localhost:5173` por defecto.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:5000/api` |

> En Vite, cualquier variable usada en el cliente debe empezar con `VITE_` — es una medida de seguridad para no exponer accidentalmente variables sensibles al navegador.