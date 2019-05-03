import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './material/material.module';
import { CustomLazyAPIKeyLoader } from './services/custom-lazy-api-key-loader';
import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from './root-store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { VenuesListComponent } from './components/venues-list/venues-list.component';
import { MapComponent } from './components/map/map.component';
import { VenuesComponent } from './containers/venues/venues.component';
import { environment } from '../environments/environment';

// components
const components = [
  AppComponent,
  HeaderComponent,
  VenuesListComponent,
  MapComponent,
  VenuesComponent
];

// modules
const modules = [
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot({}),
  BrowserAnimationsModule,
  MaterialModule,
  AppRoutingModule,
  RootStoreModule,
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production
  })
];

@NgModule({
  declarations: components,
  imports: modules,
  providers: [{ provide: MapsAPILoader, useClass: CustomLazyAPIKeyLoader }],
  bootstrap: [AppComponent]
})
export class AppModule {}
