import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  perfilExiste: boolean = false;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private authService: AuthService,
    private router: Router
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId() || '';
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.perfilService.obtenerPerfil(this.userId).subscribe({
      next: (perfil) => {
        if (perfil) {
          this.perfilExiste = true;
          this.perfilForm.patchValue(perfil);
        }
      },
      error: () => {
        this.perfilExiste = false;
      }
    });
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const accion = this.perfilExiste
      ? this.perfilService.actualizarPerfil(this.userId, this.perfilForm.value)
      : this.perfilService.crearPerfil(this.userId, this.perfilForm.value);

    accion.subscribe({
      next: () => {
        this.perfilExiste = true;
        this.successMessage = this.perfilExiste
          ? 'Perfil actualizado correctamente'
          : 'Perfil creado correctamente';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al guardar el perfil';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}