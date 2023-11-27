import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  title = 'gmaps';

  position = {
    lat:-41.47019822298548, 
    lng:-72.92582139179163
  };

  label = {
    color :'red',
    text : ''
  };
  constructor() { }

  ngOnInit() {
  }

}
