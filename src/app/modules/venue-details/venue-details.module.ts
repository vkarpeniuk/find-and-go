import { ContactsComponent } from './components/contacts/contacts.component';
import { TipsComponent } from './components/tips/tips.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { SharedModule } from './../../shared/shared.module';
import { PhotosComponent } from './components/photos/photos.component';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './containers/details/details.component';
import { VenueDetailsRoutingModule } from './venue-details-routing.module';

@NgModule({
  declarations: [
    DetailsComponent,
    PhotosComponent,
    MainInfoComponent,
    TipsComponent,
    ContactsComponent
  ],
  imports: [VenueDetailsRoutingModule, SharedModule]
})
export class VenueDetailsModule {}
