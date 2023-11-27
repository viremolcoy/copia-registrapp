import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.page.html',
  styleUrls: ['reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  newPassword: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  resetPassword() {
    this.authService.resetPassword(this.username, this.newPassword);
    this.router.navigate(['/login']);
  }
}