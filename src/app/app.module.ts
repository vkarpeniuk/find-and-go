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

// modules
const modules = [
  CoreModule,
  SharedModule,
  AppRoutingModule,
  MainModule,
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production
  })
];

@NgModule({
  declarations: [AppComponent],
  imports: modules,
  providers: [{ provide: MapsAPILoader, useClass: CustomLazyAPIKeyLoader }],
  bootstrap: [AppComponent]
})
export class AppModule {}
