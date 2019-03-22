import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VenuesComponent } from "./venues/venues.component";

const routes: Routes = [
  {
    path: "venues",
    component: VenuesComponent
  },
  { path: "", redirectTo: "/venues", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
