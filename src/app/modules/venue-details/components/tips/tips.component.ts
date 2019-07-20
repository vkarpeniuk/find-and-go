import { Component, Input } from '@angular/core';

import { Tip } from '@models*';
import { googlePossibleRatings } from 'app/core/common/constants';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {
  @Input() tips: Tip[];

  starNumbers = googlePossibleRatings;

  trackTips(index: number, item: Tip) {
    return item.time;
  }
}
