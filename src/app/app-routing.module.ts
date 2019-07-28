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
      () => import('./modules/venue-details/venue-details.module').then(m => m.VenueDetailsModule)
  },
  { path: '', redirectTo: '/venues', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
