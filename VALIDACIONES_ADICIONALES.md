# 📚 Guía de Validaciones Adicionales - Reactive Forms

## Validaciones Implementadas Actualmente

### ✅ En el proyecto actual:
```typescript
enrollmentForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  course: ['', [Validators.required, Validators.minLength(2)]],
  date: ['', [Validators.required]]
});
```

---

## 🔧 Validaciones Adicionales Disponibles

### 1. **Validators.email** (Validación de Email)

Si quisieras agregar un campo de email:

```typescript
// En el componente .ts
enrollmentForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]], // ← NUEVO
  course: ['', [Validators.required, Validators.minLength(2)]],
  date: ['', [Validators.required]]
});

// Getter
get email() {
  return this.enrollmentForm.get('email');
}
```

```html
<!-- En el template .html -->
<input
  type="email"
  formControlName="email"
  placeholder="Correo Electrónico"
  [class.invalid]="email?.invalid && (email?.touched || email?.dirty)"
  [class.valid]="email?.valid && (email?.touched || email?.dirty)">

<div class="error" *ngIf="email?.invalid && (email?.touched || email?.dirty)">
  <span *ngIf="email?.errors?.['required']">⚠️ El email es obligatorio.</span>
  <span *ngIf="email?.errors?.['email']">⚠️ Formato de email inválido.</span>
</div>
```

---

### 2. **Validators.maxLength** (Longitud Máxima)

```typescript
name: ['', [
  Validators.required, 
  Validators.minLength(3),
  Validators.maxLength(50) // ← NUEVO
]]
```

```html
<div class="error" *ngIf="name?.invalid && (name?.touched || name?.dirty)">
  <span *ngIf="name?.errors?.['maxlength']">
    ⚠️ Máximo 50 caracteres (actual: {{ name?.value?.length }}).
  </span>
</div>
```

---

### 3. **Validators.pattern** (Expresiones Regulares)

#### Ejemplo: Solo letras
```typescript
name: ['', [
  Validators.required,
  Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
]]
```

```html
<div class="error" *ngIf="name?.errors?.['pattern']">
  ⚠️ Solo se permiten letras.
</div>
```

#### Ejemplo: Teléfono
```typescript
phone: ['', [
  Validators.required,
  Validators.pattern(/^[0-9]{9,10}$/)
]]
```

```html
<div class="error" *ngIf="phone?.errors?.['pattern']">
  ⚠️ Formato de teléfono inválido (9-10 dígitos).
</div>
```

---

### 4. **Validators.min / Validators.max** (Valores Numéricos)

```typescript
age: ['', [
  Validators.required,
  Validators.min(18),
  Validators.max(100)
]]
```

```html
<input type="number" formControlName="age" placeholder="Edad">

<div class="error" *ngIf="age?.invalid && (age?.touched || age?.dirty)">
  <span *ngIf="age?.errors?.['min']">⚠️ Edad mínima: 18 años.</span>
  <span *ngIf="age?.errors?.['max']">⚠️ Edad máxima: 100 años.</span>
</div>
```

---

### 5. **Validadores Personalizados**

#### Ejemplo: Validar que dos campos coincidan (Contraseñas)

```typescript
// Función validadora personalizada
passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  
  return password === confirmPassword ? null : { passwordMismatch: true };
}

// En el formulario
enrollmentForm = this.fb.group({
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required]]
}, { validators: this.passwordMatchValidator });
```

```html
<div class="error" *ngIf="enrollmentForm.errors?.['passwordMismatch'] && 
                          enrollmentForm.get('confirmPassword')?.touched">
  ⚠️ Las contraseñas no coinciden.
</div>
```

---

### 6. **Validación Asíncrona** (Verificar en el servidor)

```typescript
// Servicio
checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/check-email/${email}`);
}

// Validador asíncrono
emailExistsValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return this.service.checkEmailExists(control.value).pipe(
      map(exists => exists ? { emailExists: true } : null),
      catchError(() => of(null))
    );
  };
}

// En el formulario
email: ['', 
  [Validators.required, Validators.email],
  [this.emailExistsValidator()] // ← Validador asíncrono
]
```

```html
<div class="error" *ngIf="email?.errors?.['emailExists']">
  ⚠️ Este email ya está registrado.
</div>
<div *ngIf="email?.pending" class="info">
  🔄 Verificando email...
</div>
```

---

## 🎨 Ejemplo Completo: Formulario Extendido

```typescript
// enrollments.component.ts
initForm() {
  this.enrollmentForm = this.fb.group({
    name: ['', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    ]],
    email: ['', [
      Validators.required, 
      Validators.email
    ]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{9,10}$/)
    ]],
    age: ['', [
      Validators.required,
      Validators.min(18),
      Validators.max(100)
    ]],
    course: ['', [
      Validators.required, 
      Validators.minLength(2)
    ]],
    date: ['', [
      Validators.required
    ]]
  });
}

// Getters
get name() { return this.enrollmentForm.get('name'); }
get email() { return this.enrollmentForm.get('email'); }
get phone() { return this.enrollmentForm.get('phone'); }
get age() { return this.enrollmentForm.get('age'); }
get course() { return this.enrollmentForm.get('course'); }
get date() { return this.enrollmentForm.get('date'); }
```

```html
<!-- enrollments.component.html -->
<form [formGroup]="enrollmentForm" (ngSubmit)="save()">
  
  <!-- Nombre -->
  <input type="text" formControlName="name" placeholder="Nombre Completo"
         [class.invalid]="name?.invalid && name?.touched"
         [class.valid]="name?.valid && name?.touched">
  <div class="error" *ngIf="name?.invalid && name?.touched">
    <span *ngIf="name?.errors?.['required']">⚠️ El nombre es obligatorio.</span>
    <span *ngIf="name?.errors?.['minlength']">⚠️ Mínimo 3 caracteres.</span>
    <span *ngIf="name?.errors?.['maxlength']">⚠️ Máximo 50 caracteres.</span>
    <span *ngIf="name?.errors?.['pattern']">⚠️ Solo se permiten letras.</span>
  </div>

  <!-- Email -->
  <input type="email" formControlName="email" placeholder="Email"
         [class.invalid]="email?.invalid && email?.touched"
         [class.valid]="email?.valid && email?.touched">
  <div class="error" *ngIf="email?.invalid && email?.touched">
    <span *ngIf="email?.errors?.['required']">⚠️ El email es obligatorio.</span>
    <span *ngIf="email?.errors?.['email']">⚠️ Formato de email inválido.</span>
  </div>

  <!-- Teléfono -->
  <input type="tel" formControlName="phone" placeholder="Teléfono"
         [class.invalid]="phone?.invalid && phone?.touched"
         [class.valid]="phone?.valid && phone?.touched">
  <div class="error" *ngIf="phone?.invalid && phone?.touched">
    <span *ngIf="phone?.errors?.['required']">⚠️ El teléfono es obligatorio.</span>
    <span *ngIf="phone?.errors?.['pattern']">⚠️ Formato inválido (9-10 dígitos).</span>
  </div>

  <!-- Edad -->
  <input type="number" formControlName="age" placeholder="Edad"
         [class.invalid]="age?.invalid && age?.touched"
         [class.valid]="age?.valid && age?.touched">
  <div class="error" *ngIf="age?.invalid && age?.touched">
    <span *ngIf="age?.errors?.['required']">⚠️ La edad es obligatoria.</span>
    <span *ngIf="age?.errors?.['min']">⚠️ Edad mínima: 18 años.</span>
    <span *ngIf="age?.errors?.['max']">⚠️ Edad máxima: 100 años.</span>
  </div>

  <!-- Curso -->
  <input type="text" formControlName="course" placeholder="Curso"
         [class.invalid]="course?.invalid && course?.touched"
         [class.valid]="course?.valid && course?.touched">
  <div class="error" *ngIf="course?.invalid && course?.touched">
    <span *ngIf="course?.errors?.['required']">⚠️ El curso es obligatorio.</span>
    <span *ngIf="course?.errors?.['minlength']">⚠️ Mínimo 2 caracteres.</span>
  </div>

  <!-- Fecha -->
  <input type="date" formControlName="date"
         [class.invalid]="date?.invalid && date?.touched"
         [class.valid]="date?.valid && date?.touched">
  <div class="error" *ngIf="date?.invalid && date?.touched">
    <span *ngIf="date?.errors?.['required']">⚠️ La fecha es obligatoria.</span>
  </div>

  <button type="submit" [disabled]="enrollmentForm.invalid">
    {{ editMode ? 'Actualizar' : 'Inscribirse' }}
  </button>
</form>
```

---

## 📊 Tabla Resumen de Validators

| Validator | Uso | Ejemplo |
|-----------|-----|---------|
| `required` | Campo obligatorio | `Validators.required` |
| `minLength(n)` | Longitud mínima | `Validators.minLength(3)` |
| `maxLength(n)` | Longitud máxima | `Validators.maxLength(50)` |
| `email` | Formato email | `Validators.email` |
| `pattern(regex)` | Expresión regular | `Validators.pattern(/^[0-9]+$/)` |
| `min(n)` | Valor mínimo | `Validators.min(18)` |
| `max(n)` | Valor máximo | `Validators.max(100)` |
| Custom | Validador personalizado | `myCustomValidator()` |
| Async | Validación asíncrona | `asyncValidator()` |

---

## 🎯 Mejores Prácticas

1. ✅ **Combinar validadores** - Usa arrays para múltiples validaciones
2. ✅ **Mensajes específicos** - Un mensaje por cada tipo de error
3. ✅ **Feedback visual** - Colores y iconos para mejor UX
4. ✅ **Validación en tiempo real** - Mostrar errores al tocar el campo
5. ✅ **Deshabilitar botón** - Si el formulario es inválido
6. ✅ **Validación en servidor** - Siempre validar también en el backend
7. ✅ **Getters** - Facilitan el acceso a los controles en el template

---

## 🚀 Cómo Agregar Nuevas Validaciones

1. **Actualizar el modelo** (si es necesario)
```typescript
export interface Enrollment {
  id?: number;
  name: string;
  email: string; // ← NUEVO
  course: string;
  date: string;
}
```

2. **Actualizar el FormGroup**
```typescript
initForm() {
  this.enrollmentForm = this.fb.group({
    // ... campos existentes
    email: ['', [Validators.required, Validators.email]] // ← NUEVO
  });
}
```

3. **Agregar getter**
```typescript
get email() {
  return this.enrollmentForm.get('email');
}
```

4. **Actualizar el template**
```html
<input type="email" formControlName="email" placeholder="Email">
<div class="error" *ngIf="email?.invalid && email?.touched">
  <span *ngIf="email?.errors?.['required']">⚠️ El email es obligatorio.</span>
  <span *ngIf="email?.errors?.['email']">⚠️ Formato inválido.</span>
</div>
```

5. **Actualizar el backend** (Spring Boot)
```java
@NotBlank(message = "El email es obligatorio")
@Email(message = "Formato de email inválido")
private String email;
```

---

**Nota:** El proyecto actual cumple con los requisitos mínimos del reto. Este documento es una guía para expandir las validaciones si lo necesitas en el futuro.
