import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.getLoggedInEmail()) {
      return true; // Usuario autenticado, permitir acceso.
    } else {
      this.router.navigate(['/login']);
      return false; // Usuario no autenticado, redirigir a la página de inicio de sesión.
    }
  }
}