import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VenuesComponent } from './modules/main/containers/venues/venues.component';

const routes: Routes = [
  {
    path: 'venues',
    component: VenuesComponent
  },
  {
    path: 'venue-details/:id',
    loadChildren:
      './modules/venue-details/venue-details.module#VenueDetailsModule'
  },
  { path: '', redirectTo: '/venues', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
