# 🧪 Guía de Pruebas Rápidas - Reactive Forms

## 🎯 Objetivo
Verificar que todas las funcionalidades de Reactive Forms estén funcionando correctamente antes de la entrega.

---

## ✅ Pruebas de Validaciones

### 1. **Campo Nombre - Validators.required**

#### Prueba:
1. Dejar el campo "Nombre" vacío
2. Hacer click en otro campo o intentar enviar

#### Resultado esperado:
- ❌ Borde rojo en el campo
- ⚠️ Mensaje: "El nombre es obligatorio"
- 🔒 Botón "Inscribirse" deshabilitado

---

### 2. **Campo Nombre - Validators.minLength(3)**

#### Prueba:
1. Escribir solo 1 o 2 caracteres en "Nombre"
2. Hacer click en otro campo

#### Resultado esperado:
- ❌ Borde rojo en el campo
- ⚠️ Mensaje: "Mínimo 3 caracteres (actual: 2)"
- 🔒 Botón "Inscribirse" deshabilitado

---

### 3. **Campo Nombre - Válido**

#### Prueba:
1. Escribir 3 o más caracteres en "Nombre"
2. Hacer click en otro campo

#### Resultado esperado:
- ✅ Borde verde en el campo
- ✓ Sin mensajes de error
- 🔓 Botón "Inscribirse" habilitado (si otros campos son válidos)

---

### 4. **Campo Curso - Validators.required**

#### Prueba:
1. Dejar el campo "Curso" vacío
2. Hacer click en otro campo o intentar enviar

#### Resultado esperado:
- ❌ Borde rojo en el campo
- ⚠️ Mensaje: "El curso es obligatorio"
- 🔒 Botón "Inscribirse" deshabilitado

---

### 5. **Campo Curso - Validators.minLength(2)**

#### Prueba:
1. Escribir solo 1 carácter en "Curso"
2. Hacer click en otro campo

#### Resultado esperado:
- ❌ Borde rojo en el campo
- ⚠️ Mensaje: "Mínimo 2 caracteres (actual: 1)"
- 🔒 Botón "Inscribirse" deshabilitado

---

### 6. **Campo Fecha - Validators.required**

#### Prueba:
1. Dejar el campo "Fecha" vacío
2. Hacer click en otro campo o intentar enviar

#### Resultado esperado:
- ❌ Borde rojo en el campo
- ⚠️ Mensaje: "La fecha es obligatoria"
- 🔒 Botón "Inscribirse" deshabilitado

---

### 7. **Formulario Completo Válido**

#### Prueba:
1. Nombre: "Juan Pérez" (más de 3 caracteres)
2. Curso: "Angular" (más de 2 caracteres)
3. Fecha: Seleccionar cualquier fecha

#### Resultado esperado:
- ✅ Todos los campos con borde verde
- ✓ Mensaje: "Formulario válido"
- 🔓 Botón "Inscribirse" habilitado

---

## 🔄 Pruebas de CRUD

### 8. **CREATE - Registrar Nueva Inscripción**

#### Prueba:
1. Completar todos los campos correctamente
2. Click en "Inscribirse"

#### Resultado esperado:
- ✅ Registro guardado en SQL Server
- 📋 Tabla actualizada con el nuevo registro
- 🔄 Formulario limpio y listo para nueva inscripción
- ✓ Sin errores en consola

#### Verificación en Backend:
```sql
SELECT * FROM enrollments ORDER BY id DESC;
```

---

### 9. **READ - Listar Inscripciones**

#### Prueba:
1. Recargar la página
2. Observar la tabla

#### Resultado esperado:
- 📋 Tabla muestra todos los registros de SQL Server
- 📅 Fechas formateadas correctamente
- ✓ Sin errores en consola

---

### 10. **UPDATE - Editar Inscripción**

#### Prueba:
1. Click en botón "Editar" de cualquier registro
2. Observar el formulario

#### Resultado esperado:
- 📝 Formulario cargado con datos del registro
- ✅ Todos los campos con borde verde (datos válidos)
- 🔄 Botón cambia a "Actualizar"
- ✓ Título cambia a "Editar Inscripción"

#### Continuar:
3. Modificar algún campo (ej: cambiar nombre)
4. Click en "Actualizar"

#### Resultado esperado:
- ✅ Cambios guardados en SQL Server
- 📋 Tabla actualizada con los nuevos datos
- 🔄 Formulario vuelve a modo "Nueva Inscripción"
- ✓ Sin errores en consola

---

### 11. **DELETE - Eliminar Inscripción**

#### Prueba:
1. Click en botón "Eliminar" de cualquier registro
2. Observar el diálogo de confirmación

#### Resultado esperado:
- ⚠️ Mensaje: "¿Está seguro de eliminar esta inscripción?"
- 🔘 Opciones: Aceptar / Cancelar

#### Si se acepta:
- ✅ Registro eliminado de SQL Server
- 📋 Tabla actualizada sin el registro
- ✓ Sin errores en consola

#### Si se cancela:
- ❌ Registro NO eliminado
- 📋 Tabla sin cambios

---

## 🎨 Pruebas de UI/UX

### 12. **Feedback Visual en Tiempo Real**

#### Prueba:
1. Escribir en el campo "Nombre"
2. Borrar todo el contenido
3. Hacer click fuera del campo

#### Resultado esperado:
- 🔴 Campo cambia a rojo inmediatamente
- ⚠️ Mensaje de error aparece
- 🔒 Botón se deshabilita

---

### 13. **Contador de Caracteres**

#### Prueba:
1. Escribir "Ab" en el campo "Nombre" (2 caracteres)
2. Hacer click fuera del campo

#### Resultado esperado:
- ⚠️ Mensaje: "Mínimo 3 caracteres (actual: 2)"
- 📊 Contador muestra la cantidad actual

---

### 14. **Indicador de Estado del Formulario**

#### Prueba:
1. Completar todos los campos correctamente

#### Resultado esperado:
- ✓ Mensaje: "Formulario válido" (en verde)

#### Prueba:
2. Borrar un campo

#### Resultado esperado:
- ⚠ Mensaje: "Complete todos los campos correctamente" (en amarillo)

---

### 15. **Botón Deshabilitado Visualmente**

#### Prueba:
1. Dejar algún campo inválido
2. Observar el botón "Inscribirse"

#### Resultado esperado:
- 🔒 Botón con opacidad reducida
- 🚫 Cursor "not-allowed" al pasar el mouse
- 🎨 Color gris en lugar del gradiente azul

---

## 🔌 Pruebas de Integración

### 16. **Conexión Frontend - Backend**

#### Prueba:
1. Abrir DevTools (F12)
2. Ir a pestaña "Network"
3. Recargar la página

#### Resultado esperado:
- ✅ Request a `http://localhost:8081/enrollments`
- ✅ Status: 200 OK
- ✅ Response con array de inscripciones
- ✓ Sin errores CORS

---

### 17. **POST - Crear Registro**

#### Prueba:
1. Completar formulario
2. Abrir DevTools → Network
3. Click en "Inscribirse"

#### Resultado esperado:
- ✅ Request POST a `http://localhost:8081/enrollments`
- ✅ Status: 200 o 201
- ✅ Request Body con los datos del formulario
- ✅ Response con el registro creado (incluye ID)

---

### 18. **PUT - Actualizar Registro**

#### Prueba:
1. Editar un registro
2. Abrir DevTools → Network
3. Click en "Actualizar"

#### Resultado esperado:
- ✅ Request PUT a `http://localhost:8081/enrollments/{id}`
- ✅ Status: 200
- ✅ Request Body con los datos actualizados
- ✅ Response con el registro actualizado

---

### 19. **DELETE - Eliminar Registro**

#### Prueba:
1. Abrir DevTools → Network
2. Click en "Eliminar" y confirmar

#### Resultado esperado:
- ✅ Request DELETE a `http://localhost:8081/enrollments/{id}`
- ✅ Status: 200 o 204
- ✅ Sin errores en consola

---

## 🐛 Pruebas de Errores

### 20. **Backend Apagado**

#### Prueba:
1. Detener el backend (Ctrl+C)
2. Recargar la página del frontend

#### Resultado esperado:
- ❌ Error en consola: "Failed to fetch"
- 📋 Tabla vacía o con mensaje de error
- ✓ Frontend no se rompe

---

### 21. **Datos Inválidos desde Backend**

#### Prueba:
1. Insertar manualmente un registro con fecha inválida en SQL Server
2. Recargar la página del frontend

#### Resultado esperado:
- ✓ Frontend maneja el error gracefully
- 📋 Muestra los datos que puede
- ✓ Sin errores críticos

---

## 📊 Checklist de Pruebas

### Validaciones
- [ ] Campo nombre vacío → error
- [ ] Campo nombre < 3 caracteres → error
- [ ] Campo nombre válido → borde verde
- [ ] Campo curso vacío → error
- [ ] Campo curso < 2 caracteres → error
- [ ] Campo fecha vacío → error
- [ ] Formulario completo válido → botón habilitado

### CRUD
- [ ] CREATE - Registrar nueva inscripción
- [ ] READ - Listar todas las inscripciones
- [ ] UPDATE - Editar inscripción existente
- [ ] DELETE - Eliminar inscripción con confirmación

### UI/UX
- [ ] Feedback visual en tiempo real
- [ ] Contador de caracteres funciona
- [ ] Indicador de estado del formulario
- [ ] Botón deshabilitado visualmente
- [ ] Colores correctos (verde/rojo)

### Integración
- [ ] GET - Listar desde backend
- [ ] POST - Crear en backend
- [ ] PUT - Actualizar en backend
- [ ] DELETE - Eliminar en backend
- [ ] Sin errores CORS

### Consola
- [ ] Sin errores en rojo
- [ ] Sin warnings críticos
- [ ] Requests HTTP exitosos

---

## 🎯 Casos de Prueba Completos

### Caso 1: Registro Exitoso
```
1. Nombre: "María García López"
2. Curso: "Desarrollo Web"
3. Fecha: "2026-05-15"
4. Click "Inscribirse"
✅ Registro creado exitosamente
```

### Caso 2: Validación de Nombre Corto
```
1. Nombre: "Ma"
2. Curso: "Angular"
3. Fecha: "2026-05-15"
❌ Error: "Mínimo 3 caracteres (actual: 2)"
🔒 Botón deshabilitado
```

### Caso 3: Edición Completa
```
1. Click "Editar" en registro existente
2. Cambiar nombre a "Juan Carlos Pérez"
3. Cambiar curso a "React Avanzado"
4. Click "Actualizar"
✅ Registro actualizado exitosamente
```

### Caso 4: Eliminación con Confirmación
```
1. Click "Eliminar" en registro
2. Aparece confirmación
3. Click "Aceptar"
✅ Registro eliminado exitosamente
```

---

## 🚀 Comandos de Verificación

### Verificar Backend
```bash
curl http://localhost:8081/enrollments
```
Debe retornar JSON con las inscripciones

### Verificar Frontend
```bash
ng serve
```
Debe compilar sin errores

### Verificar Base de Datos
```sql
SELECT COUNT(*) FROM enrollments;
```
Debe retornar el número de registros

---

## 📝 Registro de Pruebas

| Prueba | Estado | Observaciones |
|--------|--------|---------------|
| Validación nombre vacío | ⬜ | |
| Validación nombre corto | ⬜ | |
| Validación curso vacío | ⬜ | |
| CREATE funcionando | ⬜ | |
| READ funcionando | ⬜ | |
| UPDATE funcionando | ⬜ | |
| DELETE funcionando | ⬜ | |
| Feedback visual | ⬜ | |
| Sin errores consola | ⬜ | |

**Leyenda:**
- ⬜ No probado
- ✅ Funciona correctamente
- ❌ Tiene errores
- ⚠️ Funciona con advertencias

---

## 🎓 Conclusión

Si todas las pruebas pasan:
- ✅ Tu proyecto está listo para entregar
- ✅ Cumple con todos los requisitos
- ✅ Reactive Forms implementado correctamente
- ✅ Validaciones funcionando
- ✅ CRUD operativo

Si alguna prueba falla:
1. Revisa el código del componente
2. Verifica las importaciones
3. Revisa la consola del navegador
4. Verifica que el backend esté corriendo
5. Consulta `REACTIVE_FORMS_IMPLEMENTATION.md`

---

**¡Éxito en tus pruebas! 🚀**
