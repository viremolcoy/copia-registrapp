import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  title = 'gmaps';

  position = {
    lat:-41.47019822298548, 
    lng:-72.92582139179163
  };

  label = {
    color :'red',
    text : '-'
  };
  constructor() { }

  ngOnInit() {
  }

}