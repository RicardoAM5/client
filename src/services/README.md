# Servicios de API

Esta carpeta contiene los servicios para comunicarse con el backend.

## Estructura

### **api.js** - Cliente de Axios Configurado
Cliente base de Axios con:
- URL base configurable
- Interceptores para autenticación
- Manejo global de errores
- Timeout configurado

### **TipoService.js** - Servicio de Tipos
Servicio completo para gestionar Tipos con todos los endpoints del backend:

#### Métodos disponibles:

**Consultas:**
- `getAll()` - Obtener todos los tipos
- `getPaginated(page, size, sort)` - Obtener tipos paginados
- `getActive()` - Obtener solo tipos activos
- `getById(id)` - Obtener tipo por ID
- `searchByName(nombre)` - Buscar tipos por nombre
- `exists(nombre)` - Verificar si existe un tipo

**Operaciones CRUD:**
- `create(tipoData)` - Crear nuevo tipo
- `update(id, tipoData)` - Actualizar tipo
- `activate(id)` - Activar tipo
- `deactivate(id)` - Desactivar tipo
- `delete(id)` - Eliminar tipo (soft delete)

## Uso en componentes

```jsx
import TipoService from '../services/TipoService';

// En tu componente
const fetchData = async () => {
    try {
        const tipos = await TipoService.getAll();
        setTipos(tipos);
    } catch (error) {
        console.error("Error:", error);
    }
};

// Crear
await TipoService.create({ tipo: "Nuevo Tipo", estatus: true });

// Actualizar
await TipoService.update(1, { tipo: "Tipo Actualizado", estatus: true });

// Eliminar
await TipoService.delete(1);
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080
```

## Ventajas

✅ **Centralización**: Todas las llamadas API en un solo lugar
✅ **Reutilización**: Usa los servicios en cualquier componente
✅ **Mantenimiento**: Cambios en endpoints solo en un archivo
✅ **Tipado**: Fácil de agregar TypeScript después
✅ **Testing**: Fácil de mockear en tests
✅ **Seguridad**: Interceptores para tokens automáticos
