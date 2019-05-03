import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VenuesStoreModule } from './venues-store/venues-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VenuesStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
