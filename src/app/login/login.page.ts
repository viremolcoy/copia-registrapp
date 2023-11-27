import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController
  ) {}

  irInicio(){
      this.router.navigate(['/']);
  }

  async loginUser() {
    if (!this.email || !this.password) {
      // Mostrar mensaje de error si los campos están vacíos
      const emptyFieldsAlert = await this.alertController.create({
        header: 'Campos Vacíos',
        message: 'Por favor, ingresa tu correo electrónico y contraseña.',
        buttons: ['Aceptar']
      });
      await emptyFieldsAlert.present();
      return; // Detener la función si los campos están vacíos
    }
  
    const loggedIn = this.authService.login(this.email, this.password);
  
    if (loggedIn) {
      // Obten el email del usuario logueado
      const loggedInEmail = this.authService.getLoggedInEmail();
      this.email = '';
      this.password = '';
  
      // Redirige a diferentes rutas según el dominio del correo electrónico
      if (loggedInEmail.endsWith('@duocuc.cl')) {
        this.router.navigate(['/home']);
      } else if (loggedInEmail.endsWith('@profesor.duoc.cl')) {
        this.router.navigate(['/profesor']);
      }
    } else {
      // Mostrar mensaje de error
      const alert = await this.alertController.create({
        header: 'Credenciales inválidas',
        message: 'Las credenciales ingresadas son incorrectas. Intenta nuevamente.',
        buttons: ['Intentar Nuevamente']
      });
      await alert.present();
  
      // Limpiar los campos de entrada
      this.email = '';
      this.password = '';
    }
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Nueva Contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            // Llama a la función resetPassword con los datos ingresados
            this.authService.resetPassword(data.email, data.newPassword);
          },
        },
      ],
    });
    await alert.present();
  }
}
