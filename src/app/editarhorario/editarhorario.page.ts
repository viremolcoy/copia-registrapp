import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editarhorario',
  templateUrl: './editarhorario.page.html',
  styleUrls: ['./editarhorario.page.scss'],
})
export class EditarhorarioPage {
  editForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.editForm = this.formBuilder.group({
      day: ['', Validators.required],
      subjectName: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  saveClass() {
    const formData = this.editForm.value;

    // Obtén el valor de 'userSchedule' del servicio en lugar de localStorage
    const userSchedule = this.authService.getStoredSchedule();

    if (!userSchedule[formData.day]) {
      userSchedule[formData.day] = [];
    }

    userSchedule[formData.day].push({
      subjectName: formData.subjectName,
      startTime: formData.startTime,
      endTime: formData.endTime,
    });

    // Actualiza el horario utilizando el método del servicio
    this.authService.updateSchedule(userSchedule);

    // Navega de nuevo a la página de menú después de guardar
    this.navCtrl.navigateBack('/menuhr');
  }
}
