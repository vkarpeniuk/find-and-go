import { VenueDetailsStoreEffects } from './modules/venue-details/containers/details/redux/effects';
import { HeaderStoreEffects } from './modules/main/containers/header/redux/effects';
import { CustomRouterStateSerializer } from './redux/custom-router-state-serializer';
import { MainModule } from './modules/main/main.module';
import { NgModule } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CustomLazyAPIKeyLoader } from './core/services/custom-lazy-api-key-loader';
import { CoreModule } from './core';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@reducers';
import { EffectsModule } from '@ngrx/effects';
import { VenuesStoreEffects } from './modules/main/containers/venues/redux/effects';

// modules
const modules = [
  CoreModule,
  SharedModule,
  AppRoutingModule,
  MainModule,
  StoreModule.forRoot(reducers),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  EffectsModule.forRoot([
    HeaderStoreEffects,
    VenuesStoreEffects,
    VenueDetailsStoreEffects
  ]),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production
  })
];

@NgModule({
  declarations: [AppComponent],
  imports: modules,
  providers: [
    { provide: MapsAPILoader, useClass: CustomLazyAPIKeyLoader },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
