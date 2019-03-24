import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  title: string;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTestVar().subscribe(res => (this.title = res.testvar));
  }
}
