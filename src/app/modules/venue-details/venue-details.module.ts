import { NgModule } from '@angular/core';

import { VenueDetailsRoutingModule } from './venue-details-routing.module';
import { ShareModule } from '@share/share.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TipsComponent } from './components/tips/tips.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { PhotosComponent } from './components/photos/photos.component';
import { DetailsComponent } from './containers/details/details.component';

@NgModule({
  declarations: [
    DetailsComponent,
    PhotosComponent,
    MainInfoComponent,
    TipsComponent,
    ContactsComponent
  ],
  imports: [VenueDetailsRoutingModule, ShareModule]
})
export class VenueDetailsModule {}
