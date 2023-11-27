import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  usuario: any = {};
  fecha: string | undefined;
  clasesHoy: any[] = [];
  private scheduleSubscription!: Subscription;

  constructor(    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private navCtrl: NavController) {
    const loggedInEmail = this.authService.getLoggedInEmail();
    const user = this.authService.getUserByEmail(loggedInEmail);
    this.clasesHoy = this.authService.getClassesOfCurrentDay() || [];

    if (user) {
      this.usuario = user;
    }

    // Obten la fecha actual en formato DD/MM/YYYY
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    this.fecha = `${day}/${month}/${year}`;
  }

  ngOnInit() {
    // Cargar el horario inicialmente
    this.authService.loadUserSchedule();
    
    // Suscribirse a los cambios en el horario
    this.scheduleSubscription = this.authService.getScheduleObservable().subscribe(updatedSchedule => {
      console.log('Updated schedule received:', updatedSchedule);
      if (this.scheduleChanged(updatedSchedule)) {
        this.updateSchedule();
      }
    });
  }

  ngOnDestroy() {
    this.scheduleSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/ruta']);
  }

  irNotis() {
    this.router.navigate(['/notificaciones']);
  }

  irRegasistencia() {
    this.router.navigate(['/registro-horario']);
  }

  irScan(clase: any) {
    this.authService.setSelectedClass(clase);
    this.router.navigate(['/camara']);
  }

  // Actualiza el horario en la página de inicio
  updateSchedule() {
    this.clasesHoy = this.authService.getClassesOfCurrentDay() || [];
  }

  // Verifica si el horario ha cambiado realmente
  private scheduleChanged(updatedSchedule: any): boolean {
    // Implementa la lógica de comparación aquí, por ejemplo:
    return JSON.stringify(this.clasesHoy) !== JSON.stringify(updatedSchedule);
    // La lógica de comparación depende de la estructura de tus datos.
  }

    // Método para actualizar manualmente
    manualUpdate() {
      // Obtener el horario actualizado
      this.authService.loadUserSchedule();
      const updatedSchedule = this.authService.getClassesOfCurrentDay() || [];
      
      console.log('Manual update triggered');
      
      // Verificar si el horario ha cambiado realmente
      if (this.scheduleChanged(updatedSchedule)) {
        this.updateSchedule();
        // Utilizar el ChangeDetectorRef para marcar la vista para su actualización
        this.cdr.detectChanges();
      }
    }
}
