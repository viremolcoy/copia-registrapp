import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then((m) => m.MapPageModule),
    canActivate:[IngresadoGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [NoIngresadoGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterPageModule),
    canActivate: [NoIngresadoGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then((m) => m.ResetPasswordPageModule),
    canActivate: [NoIngresadoGuard],
  },
  {
    path: 'codigo-qr',
    loadChildren: () => import('./codigo-qr/codigo-qr.module').then( m => m.CodigoQrPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: '',
    loadChildren: () => import('./ruta/ruta.module').then((m) => m.RutaPageModule),
    canActivate: [NoIngresadoGuard],
  },
  {
    path: 'menuhr',
    loadChildren: () => import('./menuhr/menuhr.module').then((m) => m.MenuhrPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then((m) => m.NotificacionesPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'registro-horario',
    loadChildren: () => import('./registro-horario/registro-horario.module').then((m) => m.RegistroHorarioPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then((m) => m.AyudaPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then((m) => m.ProfesorPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'editarhorario',
    loadChildren: () => import('./editarhorario/editarhorario.module').then( m => m.EditarhorarioPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


  
  
// Página no encontrada por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
