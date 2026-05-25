# S10 | M10 | Integración de Formularios Reactivos en el CRUD

## 📋 Descripción del Proyecto

Este proyecto implementa **Formularios Reactivos (Reactive Forms)** en Angular para el sistema CRUD de inscripciones de EduSmart, reemplazando los formularios Template Driven anteriores.

---

## ✅ Requisitos Implementados

### 1. **ReactiveFormsModule**
- ✅ Importado en `app.module.ts`
- ✅ Disponible para todos los componentes

### 2. **FormGroup y FormBuilder**
- ✅ Implementado en `enrollments.component.ts`
- ✅ Uso de `FormBuilder` para crear el formulario
- ✅ Estructura del formulario:
  ```typescript
  enrollmentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    course: ['', [Validators.required, Validators.minLength(2)]],
    date: ['', [Validators.required]]
  });
  ```

### 3. **Validators**
- ✅ `Validators.required` - Campos obligatorios
- ✅ `Validators.minLength(3)` - Nombre mínimo 3 caracteres
- ✅ `Validators.minLength(2)` - Curso mínimo 2 caracteres

### 4. **Directivas Reactive Forms**
- ✅ `[formGroup]` - Vincula el FormGroup al formulario
- ✅ `formControlName` - Vincula cada input a su FormControl
- ✅ Getters para acceso simplificado a los controles

### 5. **Validaciones Visuales**
- ✅ Mensajes de error específicos por tipo de validación
- ✅ Clases CSS dinámicas (`.valid` / `.invalid`)
- ✅ Contador de caracteres en mensajes de error
- ✅ Indicador de estado del formulario
- ✅ Botón deshabilitado cuando el formulario es inválido
- ✅ Colores diferenciados:
  - 🟢 Verde para campos válidos
  - 🔴 Rojo para campos inválidos
  - ⚠️ Iconos de advertencia

---

## 🔧 Archivos Modificados

### 1. **app.module.ts**
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // ← AGREGADO
    AppRoutingModule
  ]
})
```

### 2. **enrollments.component.ts**
**Cambios principales:**
- ❌ Eliminado: `NgForm`, `[(ngModel)]`, objeto `enrollment`
- ✅ Agregado: `FormBuilder`, `FormGroup`, `Validators`
- ✅ Método `initForm()` para inicializar el formulario
- ✅ Método `save()` sin parámetros (usa `this.enrollmentForm.value`)
- ✅ Método `edit()` usa `patchValue()` para actualizar el formulario
- ✅ Getters para acceso simplificado: `get name()`, `get course()`, `get date()`

### 3. **enrollments.component.html**
**Cambios principales:**
- ❌ Eliminado: `#enrollForm="ngForm"`, `[(ngModel)]`, `#name="ngModel"`
- ✅ Agregado: `[formGroup]="enrollmentForm"`, `formControlName="name"`
- ✅ Validaciones usando: `name?.invalid`, `name?.errors?.['required']`
- ✅ Clases dinámicas: `[class.invalid]`, `[class.valid]`
- ✅ Indicador de estado del formulario

### 4. **enrollments.component.css**
**Mejoras visuales:**
- ✅ Estilos para `.invalid` (rojo con fondo claro)
- ✅ Estilos para `.valid` (verde con fondo claro)
- ✅ Estilos para `.form-status` (indicador de estado)
- ✅ Botón deshabilitado con estilo gris

---

## 🎯 Funcionalidades del CRUD

### ✅ Registrar (CREATE)
- Formulario reactivo con validaciones
- Campos obligatorios y longitud mínima
- Botón deshabilitado si el formulario es inválido
- Mensajes de error específicos

### ✅ Listar (READ)
- Tabla con todas las inscripciones
- Datos obtenidos desde SQL Server vía API REST
- Formato de fecha con pipe `| date`

### ✅ Editar (UPDATE)
- Carga datos en el formulario usando `patchValue()`
- Validaciones activas durante la edición
- Botón cambia a "Actualizar"

### ✅ Eliminar (DELETE)
- Confirmación antes de eliminar
- Actualización automática de la lista

---

## 🔗 Arquitectura de Integración

```
┌─────────────────────────────────────────────────┐
│           ANGULAR FRONTEND                      │
│                                                 │
│  ┌──────────────────────────────────────┐      │
│  │  enrollments.component.ts            │      │
│  │  - FormBuilder                       │      │
│  │  - FormGroup                         │      │
│  │  - Validators                        │      │
│  └──────────────────────────────────────┘      │
│                    ↓                            │
│  ┌──────────────────────────────────────┐      │
│  │  enrollments.service.ts              │      │
│  │  - HttpClient                        │      │
│  │  - CRUD Methods                      │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
                    ↓ HTTP
┌─────────────────────────────────────────────────┐
│           SPRING BOOT API REST                  │
│           http://localhost:8081/enrollments     │
└─────────────────────────────────────────────────┘
                    ↓ JDBC
┌─────────────────────────────────────────────────┐
│           SQL SERVER DATABASE                   │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Backend (Spring Boot)
```bash
cd EduSmart_be
mvnw spring-boot:run
```
El backend estará disponible en: `http://localhost:8081`

### Frontend (Angular)
```bash
cd EduSmart_fe
npm install
ng serve
```
El frontend estará disponible en: `http://localhost:4200`

---

## 📸 Evidencias Requeridas

### ✅ Capturas/Video debe mostrar:

1. **Landing Page** - Página de inicio de EduSmart
2. **Navegación al Dashboard** - Acceso a la gestión de inscripciones
3. **Formulario Reactivo** - Mostrar el código del componente
4. **Validaciones Funcionando**:
   - Campo vacío → mensaje de error
   - Menos de 3 caracteres en nombre → mensaje de error
   - Campos válidos → borde verde
   - Botón deshabilitado cuando hay errores
5. **Registro de Datos** - Crear nueva inscripción
6. **Edición de Datos** - Modificar inscripción existente
7. **Eliminación de Registros** - Borrar inscripción
8. **Lista de Datos** - Tabla con datos desde SQL Server
9. **Consola sin errores** - Demostrar que no hay errores

### ✅ Código debe demostrar:

- ✅ Uso de `ReactiveFormsModule`
- ✅ Uso de `FormGroup`
- ✅ Uso de `FormBuilder`
- ✅ Uso de `Validators`
- ✅ Uso de `formControlName`
- ✅ Consumo de API REST
- ✅ Conexión Frontend + Backend + Base de Datos

---

## 📦 Estructura de Repositorios GitHub

```
S10_M10_fe_ApellidosNombres  (Frontend Angular)
S10_M10_be_ApellidosNombres  (Backend Spring Boot)
S10_M10_bd_ApellidosNombres  (Scripts SQL Server)
```

---

## 🎓 Buenas Prácticas Aplicadas

1. ✅ **Separación de responsabilidades** - Componente, servicio, modelo
2. ✅ **Tipado fuerte** - Interface `Enrollment`
3. ✅ **Validaciones centralizadas** - Uso de `Validators`
4. ✅ **Código limpio** - Getters para acceso a controles
5. ✅ **UX mejorada** - Feedback visual inmediato
6. ✅ **Manejo de errores** - Try-catch en operaciones HTTP
7. ✅ **Confirmación de eliminación** - Prevención de errores
8. ✅ **Normalización de fechas** - Formato consistente

---

## 🔍 Diferencias: Template Driven vs Reactive Forms

| Aspecto | Template Driven | Reactive Forms |
|---------|----------------|----------------|
| **Configuración** | En el template HTML | En el componente TypeScript |
| **Validaciones** | Directivas HTML | Validators en código |
| **Control** | Menos control | Control total |
| **Testing** | Más difícil | Más fácil |
| **Escalabilidad** | Limitada | Excelente |
| **Directivas** | `ngModel`, `#ref` | `formGroup`, `formControlName` |
| **Módulo** | `FormsModule` | `ReactiveFormsModule` |

---

## ✨ Mejoras Implementadas

1. **Validación en tiempo real** - Feedback inmediato al usuario
2. **Contador de caracteres** - Muestra caracteres actuales vs requeridos
3. **Indicador de estado** - Mensaje de formulario válido/inválido
4. **Colores diferenciados** - Verde (válido), Rojo (inválido)
5. **Confirmación de eliminación** - Previene borrados accidentales
6. **Manejo de ID en edición** - Variable `editingId` separada
7. **Reset completo** - Limpia formulario y estado de edición

---

## 📝 Notas Importantes

- El proyecto mantiene compatibilidad con el backend desarrollado en S09
- La conexión con SQL Server debe estar activa
- El puerto del backend es `8081`
- El puerto del frontend es `4200`
- Las validaciones se ejecutan en el cliente (Angular) y deben replicarse en el servidor (Spring Boot)

---

## 🎯 Resultado Final

Una aplicación CRUD completamente funcional con:
- ✅ Formularios Reactivos implementados
- ✅ Validaciones robustas y visuales
- ✅ Integración completa Frontend + Backend + Base de Datos
- ✅ Experiencia de usuario mejorada
- ✅ Código mantenible y escalable
- ✅ Buenas prácticas de Angular aplicadas

---

**Desarrollado por:** [Tu Nombre]  
**Fecha:** Mayo 2026  
**Curso:** S10 | M10 - Formularios Reactivos en Angular
