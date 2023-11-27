import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.getLoggedInEmail()) {
      return true; // Usuario no autenticado, permitir acceso.
    } else {
      this.router.navigate(['/home']);
      return false; // Usuario autenticado, redirigir a la página de inicio.
    }
  }
}