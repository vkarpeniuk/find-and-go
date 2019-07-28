import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageDialogComponent } from '@share/components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  @Input() photos: string[] = [];

  constructor(private dialog: MatDialog) {}

  openPhoto(index: number): void {
    this.dialog.open(ImageDialogComponent, {
      data: { images: this.photos, selectedImageIdx: index }
    });
  }

  trackPhotos(index: number, item: string) {
    return item;
  }
}
