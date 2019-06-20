import { SpinnerComponent } from './components/spinner.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SpinnerComponent],
  exports: [CommonModule, MaterialModule, SpinnerComponent, DragScrollModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    DragScrollModule
  ],
  providers: []
})
export class SharedModule {}
