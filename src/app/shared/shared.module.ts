import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SpinnerComponent, ScrollTopComponent, ImageDialogComponent],
  exports: [
    CommonModule,
    MaterialModule,
    SpinnerComponent,
    ScrollTopComponent,
    DragScrollModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    DragScrollModule
  ],
  entryComponents: [ImageDialogComponent],
  providers: []
})
export class SharedModule {}
