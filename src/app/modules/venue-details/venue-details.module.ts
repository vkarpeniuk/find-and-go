import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './containers/details/details.component';
import { VenueDetailsRoutingModule } from './venue-details-routing.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, VenueDetailsRoutingModule]
})
export class VenueDetailsModule {}
