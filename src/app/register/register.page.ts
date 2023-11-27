import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  email: string = '';
  password: string = '';
  errors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  clearError(fieldName: string) {
    const index = this.errors.indexOf(fieldName);
    if (index !== -1) {
      this.errors.splice(index, 1);
    }
  }

  validateNombre() {
    if (this.nombre.length < 5) {
      if (!this.errors.includes('El nombre debe tener al menos 5 caracteres')) {
        this.errors.push('El nombre debe tener al menos 5 caracteres');
      }
    } else {
      this.clearError('El nombre debe tener al menos 5 caracteres');
    }
  }

  validateApellido() {
    if (this.apellido.length < 5) {
      if (!this.errors.includes('El apellido debe tener al menos 5 caracteres')) {
        this.errors.push('El apellido debe tener al menos 5 caracteres');
      }
    } else {
      this.clearError('El apellido debe tener al menos 5 caracteres');
    }
  }

  validateRut() {
    if (!/^\d{7,8}-[0-9kK]{1}$/.test(this.rut)) {
      if (!this.errors.includes('El Rut debe ser en formato: XXXXXXXX-X')) {
        this.errors.push('El Rut debe ser en formato: XXXXXXXX-X');
      }
    } else {
      this.clearError('El Rut debe ser en formato: XXXXXXXX-X');
    }
  }

  validateEmail() {
    if (
      !this.email.endsWith('@duocuc.cl') &&
      !this.email.endsWith('@profesor.duoc.cl')
    ) {
      if (!this.errors.includes('Debes ingresar un correo electrónico institucional')) {
        this.errors.push('Debes ingresar un correo electrónico institucional');
      }
    } else {
      this.clearError('Debes ingresar un correo electrónico institucional');
    }
  }

  validatePassword() {
    if (this.password.length < 6) {
      if (!this.errors.includes('La contraseña debe tener al menos 6 caracteres')) {
        this.errors.push('La contraseña debe tener al menos 6 caracteres');
      }
    } else {
      this.clearError('La contraseña debe tener al menos 6 caracteres');
    }
  }

  canRegister(): boolean {
    return (
      this.errors.length === 0 &&
      !!this.nombre &&
      !!this.apellido &&
      !!this.rut &&
      !!this.email &&
      !!this.password
    );
  }

  registerUser() {
    this.errors = [];

    this.validateNombre();
    this.validateApellido();
    this.validateRut();
    this.validateEmail();
    this.validatePassword();

    if (this.canRegister()) {
      const registrationResult = this.authService.register(
        this.nombre,
        this.apellido,
        this.rut,
        this.email,
        this.password
      );
      if (registrationResult === 'Registro exitoso') {
        this.router.navigate(['/login']);
      } else {
        this.errors.push(registrationResult);
      }
    }
  }
}
