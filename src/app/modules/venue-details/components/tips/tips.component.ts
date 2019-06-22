import { Tip } from '@models*';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnChanges {
  @Input() tips: Tip[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tips) {
    }
  }
}
