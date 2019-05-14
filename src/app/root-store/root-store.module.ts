import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VenuesStoreModule } from './venues-store/venues-store.module';
import { FiltersStoreModule } from './filters-store/filters-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VenuesStoreModule,
    FiltersStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
