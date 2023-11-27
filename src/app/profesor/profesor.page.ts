import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit, OnDestroy { 
  usuario: any = {};
  fecha: string | undefined;
  clasesHoy: any[] = [];
  private scheduleSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const email = this.authService.getLoggedInEmail();
    this.usuario = this.authService.getUserByEmail(email);
    this.authService.loadUserSchedule();
    this.clasesHoy = this.authService.getClassesOfCurrentDay() || [];
    
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    this.fecha = `${day}/${month}/${year}`;
  }

  ionViewWillEnter() {
    this.scheduleSubscription = this.authService.getScheduleObservable().subscribe(updatedSchedule => {
      console.log('Updated schedule received:', updatedSchedule);
      if (this.scheduleChanged(updatedSchedule)) {
        this.updateSchedule();
        // Utilizar el ChangeDetectorRef para marcar la vista para su actualización
        this.cdr.detectChanges();
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

  irQR() {
    this.router.navigate(['/codigo-qr']);
  }

  // Actualiza el horario en la página del profesor
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
  
  selectClassAndNavigate(clase: any) {
    this.authService.setSelectedClass(clase);
    this.router.navigate(['/codigo-qr']);
  }
  
}