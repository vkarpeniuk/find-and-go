import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = 48.9226;
  lng: number = 24.7111;
  constructor() {}

  ngOnInit() {}
}
