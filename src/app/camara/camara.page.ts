import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit, OnDestroy {

  decodedText: string = '';
  codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader(); // Inicializar aquí

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {
    // Opcional: puedes mantener esta inicialización aquí si lo prefieres
  }

  ngOnDestroy() {
    // Detener el lector cuando se destruye el componente
    this.codeReader.reset();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'La Página redirige a "Escanear QR"',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Ir',
          handler: () => {
            // Verificar si el texto decodificado es una URL completa
            const isCompleteURL = /^(http|https):\/\//i.test(this.decodedText);
  
            if (isCompleteURL) {
              // Si es una URL completa, redirige directamente
              window.location.href = this.decodedText;
            } else {
              // Si no es una URL completa, asume que es una ruta relativa y utiliza el enrutador
              this.router.navigateByUrl(this.decodedText);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  scan() {
    this.codeReader
      .decodeFromInputVideoDevice(undefined, 'video')
      .then((result: Result) => {
        this.decodedText = result.getText();
        this.presentAlert(); // Mostrar el alertController después de escanear el código
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
