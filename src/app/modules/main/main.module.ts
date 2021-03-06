import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { ShareModule } from '@share/share.module';
import { HeaderComponent } from './containers/header/header.component';
import { VenuesListComponent } from './components/venues-list/venues-list.component';
import { MapComponent } from './components/map/map.component';
import { VenuesComponent } from './containers/venues/venues.component';

/**
 * modules
 */
const modules = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  AgmCoreModule.forRoot({}),
  ShareModule
];

/**
 * components
 */
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
