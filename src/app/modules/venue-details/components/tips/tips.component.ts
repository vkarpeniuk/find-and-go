import { Component, Input } from '@angular/core';

import { Tip } from '@models*';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {
  @Input() tips: Tip[];

  starNumbers = [1, 2, 3, 4, 5];

  trackTips(index: number, item: Tip) {
    return item.text;
  }
}
