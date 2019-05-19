import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './containers/header/header.component';
import { VenuesListComponent } from './components/venues-list/venues-list.component';
import { MapComponent } from './components/map/map.component';
import { VenuesComponent } from './containers/venues/venues.component';
import { AgmCoreModule } from '@agm/core';
import { StoreModule } from '@ngrx/store';
import { reducer as filtersReducer } from './reducers/filters';
import { reducer as venuesReducer } from './reducers/venues';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// modules
const modules = [
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot({}),
  StoreModule.forRoot({ filters: filtersReducer, venues: venuesReducer })
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
