import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menuhr',
  templateUrl: './menuhr.page.html',
  styleUrls: ['./menuhr.page.scss'],
})
export class MenuhrPage implements OnInit {
  weekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  selectedDay: string = '';
  userSchedule: any = {};

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscríbete al observable para obtener actualizaciones automáticas del horario
    this.authService.getScheduleObservable().subscribe((updatedSchedule) => {
      this.userSchedule = updatedSchedule;
    });
  
    // Obtén el horario del usuario logeado al cargar la página
    this.userSchedule = this.authService.getStoredSchedule();
  }

  isDaySelected(day: string): boolean {
    return this.selectedDay === day;
  }

  toggleClasses(day: string): void {
    if (this.selectedDay === day) {
      this.selectedDay = '';
    } else {
      this.selectedDay = day;
    }
  }

  getClassesByDay(day: string): any[] {
    return this.userSchedule[day] || [];
  }

  deleteClass(day: string, selectedClass: any): void {
    // Elimina la clase del arreglo en el día seleccionado
    const updatedClasses = this.userSchedule[day].filter((classItem: any) => classItem !== selectedClass);

    // Actualiza el horario utilizando el método del servicio
    this.userSchedule[day] = updatedClasses;
    this.authService.updateSchedule(this.userSchedule);
  }

  irProfesor() {
    // Utiliza el NavController para navegar a la página del profesor y recargar
    this.navCtrl.navigateForward('/profesor', { state: { reload: true } });
  }
}
