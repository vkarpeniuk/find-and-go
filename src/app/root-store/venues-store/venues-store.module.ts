import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VenuesStoreEffects } from './effects';
import { venuesReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('venues', venuesReducer),
    EffectsModule.forFeature([VenuesStoreEffects])
  ],
  providers: [VenuesStoreEffects]
})
export class VenuesStoreModule {}
