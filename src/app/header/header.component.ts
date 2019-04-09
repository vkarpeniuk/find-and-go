import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  env: boolean;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.env = environment.production;
  }
}
