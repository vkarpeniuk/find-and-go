import { SharedModule } from './../../shared/shared.module';
import { PhotosComponent } from './components/photos/photos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './containers/details/details.component';
import { VenueDetailsRoutingModule } from './venue-details-routing.module';

@NgModule({
  declarations: [DetailsComponent, PhotosComponent],
  imports: [VenueDetailsRoutingModule, SharedModule]
})
export class VenueDetailsModule {}
