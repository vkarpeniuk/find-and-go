import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from './../../shared/shared.module';
import { HeaderComponent } from './containers/header/header.component';
import { VenuesListComponent } from './components/venues-list/venues-list.component';
import { MapComponent } from './components/map/map.component';
import { VenuesComponent } from './containers/venues/venues.component';
import { RouterModule } from '@angular/router';

// modules
const modules = [
  RouterModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot({})
];

// components
const components = [
  HeaderComponent,
  VenuesListComponent,
  MapComponent,
  VenuesComponent
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [HeaderComponent]
})
export class MainModule {}
