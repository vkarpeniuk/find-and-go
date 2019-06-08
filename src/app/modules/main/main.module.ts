import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from './../../shared/shared.module';
import { HeaderComponent } from './containers/header/header.component';
import { VenuesListComponent } from './components/venues-list/venues-list.component';
import { MapComponent } from './components/map/map.component';
import { VenuesComponent } from './containers/venues/venues.component';
import { reducers } from '@reducers';
import { EffectsModule } from '@ngrx/effects';
import { HeaderStoreEffects } from './containers/header/redux/effects';
import { VenuesStoreEffects } from './containers/venues/redux/effects';
import { RouterModule } from '@angular/router';

// modules
const modules = [
  CommonModule,
  RouterModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot({}),
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot([HeaderStoreEffects, VenuesStoreEffects])
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
