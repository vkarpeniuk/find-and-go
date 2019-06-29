import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DragScrollModule } from 'ngx-drag-scroll';

import { MaterialModule } from './material.module';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { VenueCategoriesPipe } from '@share/pipes/venue-categories.pipe';
import { VenueBgPhotoPipe } from '@share/pipes/venue-bg-photo.pipe';
@NgModule({
  declarations: [
    SpinnerComponent,
    ScrollTopComponent,
    ImageDialogComponent,
    VenueCategoriesPipe,
    VenueBgPhotoPipe
  ],
  exports: [
    CommonModule,
    MaterialModule,
    SpinnerComponent,
    ScrollTopComponent,
    DragScrollModule,
    VenueCategoriesPipe,
    VenueBgPhotoPipe
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
export class ShareModule {}
