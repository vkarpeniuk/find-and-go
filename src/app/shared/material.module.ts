import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatListModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatListModule
  ]
})
export class MaterialModule {}
