import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
    });

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message for invalid name', () => {
    component.nombre = 'Short'; // Simulate an invalid name
    component.registerUser(); // Call the registration function with invalid data
    fixture.detectChanges(); // Update the view after the registration function

    // Ensure that the error message is displayed correctly
    expect(component.nombreError).toBe('El nombre debe tener al menos 5 caracteres');
  });

  it('should display an error message for invalid apellido', () => {
    component.apellido = 'Short'; // Simulate an invalid apellido
    component.registerUser(); // Call the registration function with invalid data
    fixture.detectChanges(); // Update the view after the registration function

    // Ensure that the error message is displayed correctly
    expect(component.apellidoError).toBe('El apellido debe tener al menos 5 caracteres');
  });

  it('should display an error message for invalid Rut', () => {
    component.rut = 'InvalidRut'; // Simulate an invalid Rut
    component.registerUser(); // Call the registration function with invalid data
    fixture.detectChanges(); // Update the view after the registration function

    // Ensure that the error message is displayed correctly
    expect(component.rutError).toBe('El Rut debe ser en formato: XXXXXXXX-X');
  });

  // Repeat similar blocks for other error messages (email, password, etc.).
});
