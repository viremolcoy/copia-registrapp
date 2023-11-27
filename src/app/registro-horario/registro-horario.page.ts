import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-horario',
  templateUrl: './registro-horario.page.html',
  styleUrls: ['./registro-horario.page.scss'],
})
export class RegistroHorarioPage implements OnInit {
  registros: any[] = [];
  fecha: string = '';
  dia: string = '';
  mes: string = '';
  hora: string = '';
  ano: string = '';
  mostrarLista: boolean = false;
  claseSeleccionada: any = {};

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.claseSeleccionada = this.authService.getSelectedClass();
  }

  generarRegistro() {
    const fechaActual = new Date();
    this.fecha = fechaActual.toISOString();
    this.dia = this.capitalizeFirstLetter(fechaActual.toLocaleString('es-ES', { weekday: 'long' }));
    this.mes = this.capitalizeFirstLetter(fechaActual.toLocaleString('es-ES', { month: 'long' }));
    this.hora = fechaActual.toLocaleTimeString();
    this.ano = fechaActual.getFullYear().toString();
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async guardarRegistro() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      buttons: [
        {
          text: 'Cancelar registro',
          handler: () => {
            // No hagas nada o puedes realizar acciones adicionales si lo necesitas
          },
        },
        {
          text: 'Ir a inicio',
          handler: () => {
            // Limpiar los campos generados y redirigir a la página de inicio (HOME)
            this.limpiarCamposGenerados();
          },
        },
      ],
    });

    await alert.present();
  }

  mostrarRegistros() {
    this.mostrarLista = true;
  }

  private limpiarCamposGenerados() {
    // Limpiar los campos generados
    this.dia = '';
    this.mes = '';
    this.hora = '';
    this.ano = '';
    this.registros = [];

    // Redirigir a la página de inicio (HOME)
    // Asegúrate de tener el enrutamiento correctamente configurado
    this.router.navigate(['/home']);
  }
}
