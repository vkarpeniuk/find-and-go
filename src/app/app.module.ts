import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { CustomLazyAPIKeyLoader } from './custom-lazy-api-key-loader';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VenuesListComponent } from './venues-list/venues-list.component';
import { MapComponent } from './map/map.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VenuesListComponent,
    MapComponent,
    VenuesComponent,
    VenueDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({}),
    AutoCompleteModule
  ],
  providers: [{ provide: MapsAPILoader, useClass: CustomLazyAPIKeyLoader }],
  bootstrap: [AppComponent]
})
export class AppModule {}
