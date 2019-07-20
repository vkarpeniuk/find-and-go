import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { MapsAPILoader } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { MainModule } from './modules/main/main.module';
import { environment } from '../environments/environment';
import { reducers, loggerMetaReducer } from '@reducers';
import { CustomRouterStateSerializer } from './redux/custom-router-state-serializer';
import { CustomLazyAPIKeyLoader } from './core/services/custom-lazy-api-key-loader';
import { VenueDetailsStoreEffects } from './modules/venue-details/containers/details/redux/effects';
import { HeaderStoreEffects } from './modules/main/containers/header/redux/effects';
import { VenuesStoreEffects } from './modules/main/containers/venues/redux/effects';
import { AppComponent } from './app.component';

/**
 * modules
 */
const modules = [
  BrowserAnimationsModule,
  StoreModule.forRoot(reducers, { metaReducers: [loggerMetaReducer] }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  EffectsModule.forRoot([
    HeaderStoreEffects,
    VenuesStoreEffects,
    VenueDetailsStoreEffects
  ]),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production
  }),
  CoreModule,
  AppRoutingModule,
  MainModule
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
