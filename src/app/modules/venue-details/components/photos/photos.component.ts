import { ImageDialogComponent } from './../../../../shared/components/image-dialog/image-dialog.component';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

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
