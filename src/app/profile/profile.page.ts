import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  usuario: any = {
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
  };

  alumno1 = {
    direccion: 'Egaña 343',
  };

  constructor(private authService: AuthService) {
    const loggedInEmail = this.authService.getLoggedInEmail();
    const user = this.authService.getUserByEmail(loggedInEmail);

    if (user) {
      this.usuario = user;
    }
  }
}
