import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment, EnrollmentService } from '../../services/enrollments.service';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  styleUrl: './enrollments.component.css',
  templateUrl: './enrollments.component.html'
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[] = [];
  enrollmentForm!: FormGroup;
  editMode = false;
  editingId?: number;

  constructor(
    private service: EnrollmentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.load();
  }

  // Inicializar el FormGroup con FormBuilder y Validators
  initForm() {
    this.enrollmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', [Validators.required]]
    });
  }

  load() {
    this.service.getAll().subscribe(data => this.enrollments = data);
  }

  save() {
    // Marcar todos los campos como tocados para mostrar errores
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    const payload: Enrollment = {
      ...this.enrollmentForm.value,
      date: this.normalizeDateForInput(this.enrollmentForm.value.date)
    };

    if (this.editMode && this.editingId) {
      payload.id = this.editingId;
      this.service.update(this.editingId, payload).subscribe({
        next: () => {
          this.load();
          this.editMode = false;
          this.editingId = undefined;
          this.resetForm();
        },
        error: (err) => console.error('Error actualizando inscripción', err)
      });
      return;
    }

    this.service.create(payload).subscribe({
      next: () => {
        this.load();
        this.resetForm();
      },
      error: (err) => console.error('Error creando inscripción', err)
    });
  }

  edit(e: Enrollment) {
    this.editMode = true;
    this.editingId = e.id;
    
    // Usar patchValue para actualizar el formulario
    this.enrollmentForm.patchValue({
      name: e.name,
      course: e.course,
      date: this.normalizeDateForInput(e.date)
    });
  }

  delete(id: number) {
    if (confirm('¿Está seguro de eliminar esta inscripción?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }

  private resetForm() {
    this.enrollmentForm.reset({
      name: '',
      course: '',
      date: ''
    });
    this.editMode = false;
    this.editingId = undefined;
  }

  private normalizeDateForInput(value: string): string {
    if (!value) return '';

    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;

    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, '0');
    const dd = String(parsed.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Getters para facilitar el acceso a los controles en el template
  get name() {
    return this.enrollmentForm.get('name');
  }

  get course() {
    return this.enrollmentForm.get('course');
  }

  get date() {
    return this.enrollmentForm.get('date');
  }
}
