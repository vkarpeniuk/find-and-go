import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { KeyCodes } from '@models*';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
  selectedIndex: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.selectedIndex = this.data.selectedImageIdx;
  }

  goForward(): void {
    this.selectedIndex++;
  }

  goBack(): void {
    this.selectedIndex--;
  }

  close(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KeyCodes.LEFT_ARROW && this.selectedIndex !== 0) {
      this.goBack();
    } else if (
      event.keyCode === KeyCodes.RIGHT_ARROW &&
      this.selectedIndex !== this.data.images.length - 1
    ) {
      this.goForward();
    }
  }
}
