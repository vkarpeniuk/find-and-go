import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ImageDialogComponent } from '@share/components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  @Input() photos: string[] = [];

  constructor(private dialog: MatDialog) {}

  openPhoto(photoUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: photoUrl }
    });
  }
}
