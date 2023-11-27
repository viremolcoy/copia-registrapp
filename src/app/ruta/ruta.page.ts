import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

  constructor(private router: Router) { }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/register']);
  }

  irCamara() {
    this.router.navigate(['/camara']);
  }

  ngOnInit() {
    console.log('Se cargo el ngOnInit');
  }

  ionViewWillEnter() {
    console.log('Se cargo el ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('Se cargo el ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Se cargo el ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Se cargo el ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Se cargo el ngOnDestroy');
  }

}
