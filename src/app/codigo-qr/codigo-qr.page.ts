import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApinombresService } from '../apinombres.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQrPage implements OnInit {
  mostrarCodigoQRFlag = false;
  qrCodeString = '/registro-horario';
  alumnosRegistrados: number | null = null;
  fecha: string = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  nombresAleatorios: string[] = [];
  claseSeleccionada: any = {}; // Variable para almacenar la clase seleccionada

  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiNombresService: ApinombresService,
    private authService: AuthService // Agrega el servicio de autenticación
  ) {}

  ngOnInit() {
    // Inicializa la obtención de nombres aleatorios
    this.apiNombresService.obtenerNombres().subscribe((nombres) => {
      this.nombresAleatorios = nombres;
    });

    // Recupera la clase seleccionada del servicio de autenticación
    this.claseSeleccionada = this.authService.getSelectedClass();
  }

  async mostrarCantidadEstudiantes() {
    this.alumnosRegistrados = Math.floor(Math.random() * 10) + 1;

    // Obtén la cantidad de nombres correspondiente
    this.apiNombresService.getNombresAleatorios(this.alumnosRegistrados);
  }

  async guardarAsistencia() {
    if (this.alumnosRegistrados !== null && this.claseSeleccionada) {
      const alert = await this.alertController.create({
        header: 'Resumen de asistencia',
        message: `
          Clase: ${this.claseSeleccionada.subjectName}ㅤ
          Alumnos registrados: ${this.alumnosRegistrados}
        `,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Limpiar la clase seleccionada y otros datos al confirmar
              this.authService.clearSelectedForm();
              this.alumnosRegistrados = null; // Restablecer el contador
              this.nombresAleatorios = []; // Limpiar la lista de nombres aleatorios
              this.router.navigate(['/profesor']);
            },
          },
        ],
      });
  
      await alert.present();
    }
  }
  mostrarCodigoQR() {
    this.authService.clearSelectedClass(); // Limpiar la clase seleccionada
    this.alumnosRegistrados = null; // Restablecer el contador
    this.nombresAleatorios = []; // Limpiar la lista de nombres aleatorios
    this.mostrarCodigoQRFlag = true;
  }

  ocultarCodigoQR() {
    this.mostrarCodigoQRFlag = false;
  }
}