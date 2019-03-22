import { environment } from "../../environments/environment";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.styl"]
})
export class HeaderComponent implements OnInit {
  title: string;
  constructor() {}

  ngOnInit() {
    this.title = environment.testvar;
  }
}
