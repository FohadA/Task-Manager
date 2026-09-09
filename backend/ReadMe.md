## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) para autenticación
- bcrypt para hash de contraseñas
- Joi para validación de datos

## Instalación y ejecución local

### Prerrequisitos
- Node.js v18 o superior
- Una base de datos MongoDB (local o [MongoDB Atlas](https://www.mongodb.com/atlas))

### Pasos

1. Clonar el repositorio y entrar a la carpeta backend
```bash
   git clone <url-del-repo>
   cd backend
```

2. Instalar dependencias
```bash
   npm install
```

3. Configurar variables de entorno
```bash
   cp .env.example .env
```
   > En Windows con CMD: `copy .env.example .env` — con PowerShell: `Copy-Item .env.example .env`

   Luego completa `.env` con tus valores reales (ver tabla abajo).

4. Levantar el servidor en modo desarrollo
```bash
   npm run dev
```
   El servidor corre en `http://localhost:5000` por defecto.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto del servidor | `5000` |
| `MONGO_URI` | Cadena de conexión a MongoDB | `mongodb+srv://usuario:password@cluster.mongodb.net/gestion-proyectos` |
| `JWT_SECRET` | Secreto para firmar los tokens JWT | *(ver comando abajo)* |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token | `7d` |
| `NODE_ENV` | Entorno de ejecución | `development` |

Generar un `JWT_SECRET` seguro:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Endpoints

### Auth — `/api/auth`

| Método | Ruta | Body | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | `{ nombre, email, password }` | Registra un usuario nuevo |
| POST | `/api/auth/login` | `{ email, password }` | Devuelve `{ usuario, token }` |

### Proyectos — `/api/projects` *(requieren header `Authorization: Bearer <token>`)*

| Método | Ruta | Body / Query | Descripción |
|---|---|---|---|
| GET | `/api/projects?search=&sort=asc\|desc` | — | Lista los proyectos del usuario autenticado |
| POST | `/api/projects` | `{ nombre, descripcion, fechaLimite }` | Crea un proyecto |
| PUT | `/api/projects/:id` | Campos a actualizar | Edita un proyecto propio |
| DELETE | `/api/projects/:id` | — | Elimina un proyecto y sus tareas asociadas |

### Tareas — `/api/tasks` *(requieren header `Authorization: Bearer <token>`)*

| Método | Ruta | Body / Query | Descripción |
|---|---|---|---|
| GET | `/api/tasks?proyecto=&estado=&prioridad=&page=&limit=` | — | Lista tareas filtrables y paginadas (mín. 10 por página) |
| POST | `/api/tasks` | `{ titulo, descripcion, estado, prioridad, fechaVencimiento, proyecto }` | Crea una tarea |
| PUT | `/api/tasks/:id` | Campos a actualizar | Edita una tarea propia |
| DELETE | `/api/tasks/:id` | — | Elimina una tarea |

### Reportes — `/api/reportes` *(requiere header `Authorization: Bearer <token>`)*

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/reportes` | Devuelve `{ summary, tasksByStatus, topPendingProjects, productivity }` ya procesado en el backend |

## Modelos de datos

- **Usuario:** `nombre`, `email` (único), `password` (hasheado con bcrypt), `createdAt`
- **Proyecto:** `nombre`, `descripcion`, `fechaLimite`, `usuario` (ref), `createdAt`
- **Tarea:** `titulo`, `descripcion`, `estado` (pendiente/en_progreso/completada), `prioridad` (baja/media/alta), `fechaVencimiento`, `fechaCompletada`, `proyecto` (ref), `usuario` (ref), `createdAt`

## Decisiones técnicas

- **Capa de `services` separada de los `controllers`.** Los controllers solo traducen HTTP ↔ negocio; toda la lógica real vive en `services/`, lo que la hace testeable sin necesitar un servidor Express levantado.

- **Campos de modelo en español, código interno en inglés.** Los campos del schema (`nombre`, `estado`, `fechaVencimiento`, etc.) siguen exactamente el enunciado. Funciones, archivos y rutas (`getProjects`, `/api/projects`) están en inglés, excepto `/api/reportes`, que el PDF exige con ese nombre literal.

- **`fechaCompletada` agregado al modelo Tarea**, aunque no está en el enunciado original. Es necesario para el reporte de "productividad por fecha": usar `updatedAt` sería incorrecto, porque cambia con cualquier edición, no solo al completar la tarea.

- **Ownership filtrado a nivel de query, no verificado después.** Todo update/delete de proyecto o tarea usa `{ _id, usuario }` en la misma consulta a Mongo. Si alguien intenta modificar un recurso ajeno, Mongo no encuentra el documento (404) — nunca llega a estar en memoria del servidor.

- **Borrado en cascada explícito en el service**, no con un hook de Mongoose: al eliminar un proyecto, el service borra sus tareas asociadas con una llamada explícita, para que la lógica de negocio sea visible leyendo el código, no escondida en el modelo.

- **`/api/reportes` con queries independientes en paralelo (`Promise.all`)**, en vez de un único pipeline `$facet`. Es más lento en teoría, pero a esta escala es irrelevante, y a cambio cada métrica es una función legible y testeable por separado.

- **Validación con Joi como middleware reutilizable** (`middlewares/validate.js`), en vez de repetir validación en cada controller.

- **`select: false` en el password** del modelo Usuario, para que nunca se devuelva por accidente en un `find()` normal.

## Notas

- CORS está habilitado para permitir que el frontend, desplegado en otro dominio (ej. Vercel), consuma esta API.
- El manejador de errores centralizado (`middlewares/errorHandler.js`) devuelve siempre un JSON consistente `{ message, stack }` (stack solo fuera de producción).